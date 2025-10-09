import { Buffer } from 'buffer';

declare namespace Brainxiex {
  interface Config {
    apikey?: string;
    BASE?: string;
    session_local?: boolean;
  }

  type AnyObject = { [key: string]: any };

  interface LLMPayload {
    messages?: Array<{ role: string; content: string }>;
    model?: string;
    sessionID?: string;
    [key: string]: any;
  }

  interface AI {
    (payload: LLMPayload): Promise<any>;
    LLM: (payload: LLMPayload) => Promise<any>;
    simple: (prompt: string, model?: string, sessionID?: string, images?: string | Buffer) => Promise<any>;
  }

  interface ImageAPI {
    remini(input: Buffer | string): Promise<Buffer | AnyObject>;
    hitamkan(input: Buffer | string, ext?: string): Promise<Buffer | AnyObject>;
    toAnime(input: Buffer | string, ext?: string): Promise<Buffer | AnyObject>;
    imagine(prompt: string): Promise<Buffer | AnyObject>;
    nulis(text: string): Promise<Buffer | AnyObject>;
    sticker(input: Buffer | string, pack?: string): Promise<Buffer | AnyObject>;
    welcomeCard(name: string, number: string, ppimg: string, group: string, memberCount: number, title?: string): Promise<Buffer | AnyObject>;
    goodbyeCard(name: string, number: string, ppimg: string, group: string, memberCount: number, title?: string): Promise<Buffer | AnyObject>;
    banner(name: string, ppimg: string): Promise<Buffer | AnyObject>;
    screenshot(url: string): Promise<Buffer | AnyObject>;
    fakechat(name: string, ppimg: string, arg: AnyObject): Promise<Buffer | AnyObject>;
  }

  interface DownloaderAPI {
    [key: string]: (url: string) => Promise<any>;
  }

  interface ToolsAPI {
    [key: string]: (...args: any[]) => Promise<any> | any;
  }

  interface ApiNamespace {
    ai: AI;
    image: ImageAPI;
    downloader: DownloaderAPI;
    media2buffer: (input: Buffer | string, postBody?: any) => Promise<Buffer>;
    minigame: ToolsAPI;
    random: ToolsAPI;
    search: ToolsAPI;
    tools: ToolsAPI;
    stalk: ToolsAPI;
    toURL: (input: Buffer | string, extension?: string) => Promise<any>;
  }

  interface Client {
    version: string;
    api: ApiNamespace;
  }
}

declare function brainxiex(config?: Brainxiex.Config): Brainxiex.Client;

export = brainxiex;
