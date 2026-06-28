const fs = require('fs');
const util = require("util");
const path = require('path');
const _axios = require("axios");
const os = require('os');
const { Stream } = require('stream');
const axiosVersion = require('axios/package.json').version;
const this_pkg = require("../package.json");



const userAgent = `${this_pkg.name}/${this_pkg.version} axios/${axiosVersion} ${os.type()} ${os.release()} (${os.hostname()}; ${process.arch})`;

const axios = _axios.create({
    headers: {
        'User-Agent': userAgent
    }
});

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

fs.save = fs.writeFileSync;
fs.load = fs.readFileSync;
fs.cek = fs.existsSync;
fs.dir = fs.readdirSync;
fs.del = fs.unlinkSync;
fs.isFolder = fs.isDir = (path) => fs.cek(path) && fs.statSync(path).isDirectory();
fs.isFile = (path) => fs.cek(path) && fs.statSync(path).isFile();

const isset = (ada) => {
    if (typeof ada == "string") ada = ada.trim();

    if (typeof ada == "object" && ada != null) return Object.keys(ada).length > 0;
    if (ada == "" || ada == '""') return false;
    if (ada == Error || ada == undefined || ada == null) return false;
    if (typeof ada === 'number' && isNaN(ada)) return false;
    return true;
};

function isBigint(param) {
    return typeof param == "bigint";
}

function isBoolean(param) {
    return typeof param == "boolean";
}
const isBool = isBoolean;
const isBooleanValue = isBoolean;

function isFunction(param) {
    return typeof param == "function";
}
const isFunc = isFunction;
const isFxn = isFunction;
const isFn = isFunction;

function isNumber(param) {
    return typeof param == "number";
}
const isNum = isNumber;
const isNumeric = isNumber;

function isObject(param) {
    return typeof param == "object";
}
const isObj = isObject;
const isObjectValue = isObject;

function isString(param) {
    return typeof param == "string";
}
const isStr = isString;
const isText = isString;

function isSymbol(param) {
    return typeof param == "symbol";
}
const isSym = isSymbol;

function isSet(param) {
    return isset(param);
}
const isSetValue = isSet;

function isBuffer(param) {
  return Buffer.isBuffer(param);
}
const isBuf = isBuffer;

function isJSON(param) {
    if(isBuffer(param)) return false;
    if(isNumber(param)) return false;
    if(isBigint(param)) return false;
    if(isFunction(param)) return false;
    if(isBoolean(param)) return false;

    
    if(isObj(param)) return true;
    if (isString(param)) {
        try {
            JSON.parse(param);
        } catch (e) {
            return false;
        }
        return true;
    }
    return false;
}

const isJSONValid = isJSON;


function encodeURLParameter(obj, sep = '&', eq = '=', name) {
  const stringifyPrimitive = (v) => {
    switch (typeof v) {
      case 'string': return v;
      case 'boolean': return v ? 'true' : 'false';
      case 'number': return isFinite(v) ? String(v) : '';
      default: return '';
    }
  };
  if (obj === null || obj === undefined) return '';
  if (typeof obj === 'object') {
    return Object.entries(obj)
      .map(([key, value]) => {
        const encodedKey = encodeURIComponent(stringifyPrimitive(key));
        if (Array.isArray(value)) {
          return value
            .map((v) => `${encodedKey}${eq}${encodeURIComponent(stringifyPrimitive(v))}`)
            .join(sep);
        }
        return `${encodedKey}${eq}${encodeURIComponent(stringifyPrimitive(value))}`;
      })
      .join(sep);
  }
  if (!name) return '';
  return `${encodeURIComponent(stringifyPrimitive(name))}${eq}${encodeURIComponent(stringifyPrimitive(obj))}`;
}

function decodeURLParameter(params = '') {
  try { return JSON.parse(params); } catch (e) {
    if (`${params}`.includes('=')) {
      try{
        return JSON.parse(`{${params.split('&').map(c => {
          try{
            const [a, b] = c.split('=');
            return `${JSON.stringify(a)}: ${Number(b)||JSON.stringify(decodeURIComponent(b))}`;
          }catch(e){ return `"undefined":null`; }
        }).join(',')}}`)||{};
      }catch(e){ return {}; }
    } else { return {}; }
  }
}

function parseCookies(cookieHeader='') {
  const cookies = {};
  if (cookieHeader) {
    cookieHeader.split(';').forEach(cookie => {
      const parts = cookie.split('=');
      const name = `${parts[0]}`.trim();
      const value = `${parts[1]||''}`.trim();
      cookies[name] = value;
    });
  }
  return cookies;
}

function serializeCookie(cookie) {
  let cookieStr = '';
  for (const key in cookie) {
    const value = cookie[key];
    cookieStr += `${key}=${value}; `;
  }
  cookieStr = cookieStr.trim().slice(0,-1);
  return cookieStr;
}

function setCookie(res, name, value, maxAgeInSeconds = 3600, path = '/') {
  const cookie = `${name}=${value}; Max-Age=${maxAgeInSeconds}; Path=${path}; HttpOnly`;
  return res.setHeader('Set-Cookie', cookie);
}
let errorcount = 0;
function logDetailedError(err, evalCode = null) {
  errorcount++;
  
  const red = '\x1b[31m';
  const reset = '\x1b[0m';
  const gray = '\x1b[90m';
  const yellow = '\x1b[33m';
  try {
    const time = new Date().toISOString();
    const stackLines = (err && err.stack) ? err.stack.split('\n') : [String(err)];
    const locationLine = stackLines[1] ? stackLines[1].trim() : '';
    console.error(`${red}[ERROR ${time}]${reset} ${err && err.message ? err.message : String(err)}`);
    if (/eval|<anonymous>|REPL/.test(locationLine)) {
      const evalMatch = locationLine.match(/:(\d+):(\d+)\)?$/);
      const evalLine = evalMatch ? parseInt(evalMatch[1], 10) : null;
      const evalColumn = evalMatch ? parseInt(evalMatch[2], 10) : null;
      console.error(`${yellow}Location:${reset} Eval/REPL context`);
      if (evalCode) {
        const codeLines = evalCode.split('\n');
        const start = Math.max(0, (evalLine || 1) - 3);
        const end = Math.min(codeLines.length, (evalLine || 1) + 2);
        for (let i = start; i < end; i++) {
          const lineNum = (i + 1).toString().padStart(4, ' ');
          const lineContent = codeLines[i];
          if (evalLine && i + 1 === evalLine) {
            const before = lineContent.slice(0, evalColumn - 1);
            const errorChar = lineContent[evalColumn - 1] || '';
            const after = lineContent.slice(evalColumn);
            console.error(`${red}>${reset}${lineNum} | ${before}${red}${errorChar}${reset}${after}`);
          } else {
            console.error(`${gray} ${lineNum} | ${lineContent}${reset}`);
          }
        }
      } else {
        console.error(`${gray}No source code available for eval context.${reset}`);
      }
      return;
    }
    const match = locationLine.match(/\((.*):(\d+):(\d+)\)/);
    if (!match) {
      console.error(`${gray}Location not found in stack trace${reset}`);
      return;
    }
    const [, filePath, line, column] = match;
    const lineNumber = parseInt(line, 10);
    const columnNumber = parseInt(column, 10);
    console.error(`${yellow}Location:${reset} ${filePath}:${lineNumber}:${columnNumber}`);
    try {
      const codeLines = fs.readFileSync(filePath, 'utf-8').split('\n');
      const start = Math.max(0, lineNumber - 3);
      const end = Math.min(codeLines.length, lineNumber + 2);
      for (let i = start; i < end; i++) {
        const lineNum = (i + 1).toString().padStart(4, ' ');
        const lineContent = codeLines[i];
        if (i + 1 === lineNumber) {
          const before = lineContent.slice(0, columnNumber - 1);
          const errorChar = lineContent[columnNumber - 1] || '';
          const after = lineContent.slice(columnNumber);
          console.error(`${red}>${reset}${lineNum} | ${before}${red}${errorChar}${reset}${after}`);
        } else {
          console.error(`${gray} ${lineNum} | ${lineContent}${reset}`);
        }
      }
    } catch {
      console.error(`${gray}Could not read source file for context.${reset}`);
    }
  } catch (innerErr) {
    console.error(err, `\nError in logDetailedError: ${innerErr && innerErr.message ? innerErr.message : innerErr}`);
  }

  if(errorcount > 10) process.exit()
}

function string(obj) {
  try {
    if (obj === null || obj === undefined) return '';
    if (typeof obj == "string") return obj;
    if (Buffer.isBuffer(obj)) return obj.toString();

    return JSON.stringify(obj);
  } catch (error) {
    console.error('Error stringifying object:', error);
    return '';
  }
}

function formatDurasiDate(start, end = new Date()) {
  let from = new Date(start);
  let to = new Date(end);

  if (to < from) [from, to] = [to, from];

  let tahun = to.getFullYear() - from.getFullYear();
  let bulan = to.getMonth() - from.getMonth();
  let hari = to.getDate() - from.getDate();
  let jam = to.getHours() - from.getHours();
  let menit = to.getMinutes() - from.getMinutes();
  let detik = to.getSeconds() - from.getSeconds();

  if (detik < 0) {
    detik += 60;
    menit--;
  }

  if (menit < 0) {
    menit += 60;
    jam--;
  }

  if (jam < 0) {
    jam += 24;
    hari--;
  }

  if (hari < 0) {
    const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0).getDate();
    hari += prevMonth;
    bulan--;
  }

  if (bulan < 0) {
    bulan += 12;
    tahun--;
  }

  const hasil = [];
  if (tahun > 0) hasil.push(`${tahun} tahun`);
  if (bulan > 0) hasil.push(`${bulan} bulan`);
  if (hari > 0) hasil.push(`${hari} hari`);
  if (jam > 0) hasil.push(`${jam} jam`);
  if (menit > 0) hasil.push(`${menit} menit`);
  if (detik > 0 || hasil.length === 0) hasil.push(`${detik} detik`);

  return hasil.join(" ");
}


function savedb (path,data) {
  const fullPath = path.resolve(path.join(`./server/db/`,path));
  const dirpath = require('path').dirname(fullPath);
  
  if(fs.isFile(dirpath)) console.log(`Error Itumah File njir Foldernya`);
  if(!fs.cek(dirpath)) return fs.mkdirSync(dirpath,{recursive: true});

  if(isObject(data)) data = JSON.stringify(data);
  if(isBuffer(data)) data = data;
  if(isNumber(data)) data = data.toString();

  if(!(isString(data) || isBuffer(data))) return console.log(`Error Type Data Tidak Di Izininkan Masuk DB`);
  
  fs.save(fullPath,data);
  return fs.cek(fullPath);
}

function loaddb(path) {
  const fullPath = path.resolve(path.join(`./server/db/`, path));
  
  if (!fs.cek(fullPath)) return console.log(`Error: File tidak ditemukan di ${fullPath}`);

  const data = fs.load(fullPath);
  return JSON.parseForce(data,false) ? JSON.parse(data) : data;
}

function detectFileType(buffer) {
  if (!(Buffer.isBuffer(buffer) || typeof buffer == 'string') || buffer.length < 4) {
    return { ext: 'unknown', mime: 'application/octet-stream' };
  }

  const hex = buffer.toString('hex', 0, 32);
  const text = buffer.toString('utf8', 0, Math.min(buffer.length, 4096));

  // =====================================================
  // IMAGE
  // =====================================================
  if (hex.startsWith('89504e47')) return { ext: 'png', mime: 'image/png' };
  if (hex.startsWith('ffd8ff'))   return { ext: 'jpg', mime: 'image/jpeg' };
  if (hex.startsWith('47494638')) return { ext: 'gif', mime: 'image/gif' };
  if (hex.startsWith('424d'))     return { ext: 'bmp', mime: 'image/bmp' };
  if (hex.startsWith('52494646') && text.includes('WEBP')) return { ext: 'webp', mime: 'image/webp' };

  // =====================================================
  // VIDEO
  // =====================================================
  if (hex.includes('66747970'))   return { ext: 'mp4', mime: 'video/mp4' };
  if (hex.startsWith('1a45dfa3')) return { ext: 'mkv', mime: 'video/x-matroska' };
  if (hex.startsWith('52494646') && text.includes('AVI')) return { ext: 'avi', mime: 'video/x-msvideo' };

  // =====================================================
  // AUDIO
  // =====================================================
  if (hex.startsWith('494433')) return { ext: 'mp3', mime: 'audio/mpeg' };
  if (hex.startsWith('fff1') || hex.startsWith('fff9')) return { ext: 'aac', mime: 'audio/aac' };
  if (hex.startsWith('4f676753')) return { ext: 'ogg', mime: 'audio/ogg' };
  if (hex.startsWith('52494646') && text.includes('WAVE')) return { ext: 'wav', mime: 'audio/wav' };
  if (hex.startsWith('664c6143')) return { ext: 'flac', mime: 'audio/flac' };

  // =====================================================
  // DOCUMENT
  // =====================================================
  if (hex.startsWith('25504446')) return { ext: 'pdf', mime: 'application/pdf' };

  // =====================================================
  // ARCHIVE & OFFICE (ZIP BASED)
  // =====================================================
  if (hex.startsWith('504b0304')) {
    if (text.includes('word/')) return { ext: 'docx', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' };
    if (text.includes('ppt/')) return { ext: 'pptx', mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' };
    if (text.includes('xl/')) return { ext: 'xlsx', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' };
    return { ext: 'zip', mime: 'application/zip' };
  }

  if (hex.startsWith('52617221')) return { ext: 'rar', mime: 'application/x-rar-compressed' };
  if (hex.startsWith('377abcaf271c')) return { ext: '7z', mime: 'application/x-7z-compressed' };
  if (hex.startsWith('1f8b08')) return { ext: 'gz', mime: 'application/gzip' };

  // =====================================================
  // SCRIPT / TEMPLATE / BXML
  // =====================================================
  if (/^\s*(const|let|var)\s+\w+\s*=/.test(text)) return { ext: 'js', mime: 'application/javascript', dangerous: false };
  if (/\bimport\s+.*?from\s+['"]/i.test(text)) return { ext: 'js', mime: 'application/javascript', dangerous: false };
  if (/^\s*export\s+.*$/m.test(text)) return { ext: 'js', mime: 'application/javascript', dangerous: false };
  
  if (/\bimport\s+.*?from\s+['"]/i.test(text)) return { ext: 'esm.js', mime: 'application/javascript', dangerous: false };
  
  if (/^\s*(export\s+default|export\s+\{)/.test(text)) return { ext: 'esm.js', mime: 'application/javascript', dangerous: false };
  
  if (/^\s*import\s+.*?;\s*\n/.test(text)) return { ext: 'typescript', mime: 'application/typescript', dangerous: false };
  if (/^\s*export\s+.*?;\s*\n/.test(text)) return { ext: 'typescript', mime: 'application/typescript', dangerous: false };

  if (/<\?(php|=)/i.test(text)) return { ext: 'php', mime: 'application/x-php', dangerous: true };

  if (/<script\s+nodejs\s*>[\s\S]*?<\/script>/i.test(text)) return {
    ext: 'bxml',
    mime: 'application/x-bxml',
    dangerous: true,
    reason: 'nodejs script tag'
  };

  if (/\({3,}[\s\S]*?\){3,}/.test(text)) return {
    ext: 'bxml',
    mime: 'application/x-bxml',
    dangerous: true,
    reason: 'expression parentheses injection'
  };

  if (/\{\{\s*get\s+[^}]+\}\}/i.test(text)) return {
    ext: 'bxml',
    mime: 'application/x-bxml',
    dangerous: true,
    reason: 'template get injection'
  };

  if (/\{\{[^}]{1,200}\}\}/.test(text)) return {
    ext: 'bxml',
    mime: 'application/x-bxml',
    dangerous: true,
    reason: 'generic template injection'
  };

  // =====================================================
  // FALLBACK
  // =====================================================
  return { ext: 'unknown', mime: 'application/octet-stream' };
}

function isStream(obj) {
    return obj instanceof Stream;
}

function isReadableStream(obj) {
    return isStream(obj) && typeof obj._read === 'function' && typeof obj._readableState === 'object';
}

function isWritableStream(obj) {
    return isStream(obj) && typeof obj._write === 'function' && typeof obj._writableState === 'object';
}

function isDuplexStream(obj) {
    return isReadableStream(obj) && isWritableStream(obj);
}

function isTransformStream(obj) {
    return isDuplexStream(obj) && typeof obj._transform === 'function';
}

isStream.isReadableStream = isReadableStream;
isStream.isWritableStream = isWritableStream;
isStream.isTransformStream = isTransformStream;

module.exports = {
  fs,
  isJSON,
  encodeURLParameter,
  decodeURLParameter,
  parseCookies,
  serializeCookie,
  setCookie,
  logDetailedError,
  sleep,
  isBigint,
  isBool,
  isFunction,
  isNum,
  isObj,
  isStr,
  isSym,
  isSetValue,
  isJSONValid,
  isText,
  isNumeric,
  isBooleanValue,
  isObjectValue,
  isString,
  isBoolean,
  isSet,
  isSymbol,
  isFxn,
  isFn,
  isFunction,
  isBoolean,
  isSetValue,
  isBuffer,
  isBuf,
  isStream,
  isReadableStream,
  isWritableStream,
  isTransformStream,
  string,
  log,
  typeLog,
  formatDurasiDate,
  ...util,
  savedb,
  loaddb,
  detectFileType,
  axios,
  userAgent
};



const JSON_parse = JSON.parse;

JSON.parseForce = function(json, defalut = {}) {
  try {
    if(Buffer.isBuffer(json)) return JSON.parse(json);
    if(typeof json == "object") return json;
    if(typeof json == "string") return JSON.parse(json);;
    
    return JSON.parse(json);
  } catch (error) {
      return defalut;
  }
}

function typeLog(text, delay = 50) {
  let i = 0;

  const interval = setInterval(() => {
    process.stdout.write(text[i]);
    i++;

    if (i >= text.length) {
      clearInterval(interval);
      process.stdout.write('\n'); // pindah baris setelah selesai
    }
  }, delay);
}

function log(...args) {
  const msg = args.map(a =>
    typeof a === 'string'
      ? a
      : util.inspect(a, { colors: true, depth: null })
  );

  const out = msg.join(" ")

  typeLog(out)
}



