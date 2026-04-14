/// <reference types="node" />

declare namespace Brainxiex {

  // ======================
  // CORE TYPES
  // ======================

  interface AIResponse {
    answer?: string;
    [key: string]: any;
  }

  type AnyObject = Record<string, any>;

  // ======================
  // AI
  // ======================

  interface AI {
    (payload: {
      model?: string;
      messages: { role: string; content: string }[];
      sessionID?: string;
      images?: any[];
    }): Promise<AIResponse>;

    LLM: AI;

    simple(
      prompt: string,
      model?: string,
      sessionID?: string,
      images?: any[]
    ): Promise<AIResponse>;
  }

  // ======================
  // DOWNLOADER
  // ======================

  interface Downloader {
    reels(url: string): Promise<AnyObject>;
    facebook(url: string): Promise<AnyObject>;
    instagram(url: string): Promise<AnyObject>;
    tiktok(url: string): Promise<AnyObject>;
    twitter(url: string): Promise<AnyObject>;
    youtube(url: string): Promise<AnyObject>;

    fb(url: string): Promise<AnyObject>;
    ig(url: string): Promise<AnyObject>;
    tt(url: string): Promise<AnyObject>;
    tw(url: string): Promise<AnyObject>;
    yt(url: string): Promise<AnyObject>;

    play(query: string): Promise<AnyObject>;
  }

  // ======================
  // IMAGE
  // ======================

  interface Image {
    remini(input: any): Promise<Buffer>;
    hitamkan(input: any): Promise<Buffer>;
    toAnime(input: any): Promise<Buffer>;

    imagine(prompt: string): Promise<Buffer>;
    nulis(text: string): Promise<Buffer>;

    sticker(input: any): Promise<Buffer>;

    welcomeCard(data: AnyObject): Promise<Buffer>;
    goodbyeCard(data: AnyObject): Promise<Buffer>;
    banner(data: AnyObject): Promise<Buffer>;

    screenshot(url: string): Promise<Buffer>;
    fakechat(data: AnyObject): Promise<Buffer>;
  }

  // ======================
  // MINIGAME
  // ======================

  interface Minigame {
    family100(): AnyObject;
    tebakgambar(): AnyObject;
    caklontong(): AnyObject;
    siapakahaku(): AnyObject;
    tebakbendera(): AnyObject;
    tebakkalimat(): AnyObject;
    tebakkata(): AnyObject;
    tebakkimia(): AnyObject;
    tebaklirik(): AnyObject;
    tebaktebakan(): AnyObject;
  }

  // ======================
  // RANDOM
  // ======================

  interface Random {
    apakah(text: string): AnyObject;
    bisakah(text: string): AnyObject;
    citacita(): AnyObject;
    truth(): AnyObject;
    dare(): AnyObject;
    fakta(): AnyObject;
    gombal(): AnyObject;
    hobi(): AnyObject;
    katamutiara(): AnyObject;
    tebakan(): AnyObject;
    watak(): AnyObject;
  }

  // ======================
  // SEARCH
  // ======================

  interface Search {
    pinterest(query: string): AnyObject;
    google(query: string): AnyObject;
    youtubeSearch(query: string): AnyObject;
    yts(query: string): AnyObject;
  }

  // ======================
  // TOOLS
  // ======================

  interface Tools {
    textToBase64(text: string): string;
    base64ToText(base64: string): string;

    textToEnchant(text: string): string;
    enchantToText(text: string): string;

    textToSunda(text: string): string;
    sundaToText(text: string): string;

    extToMimetype(ext: string): string;
    mimetypeToExt(mime: string): string;

    gtts(text: string): Buffer | string;

    formater(data: AnyObject): Promise<AnyObject>;

    googleAI(prompt: string): AnyObject;
  }

  // ======================
  // STALK
  // ======================

  interface Stalk {
    tiktokstalk(username: string): AnyObject;
    instagramstalk(username: string): AnyObject;
    robloxstalk(username: string): AnyObject;
  }

  // ======================
  // API ROOT
  // ======================

  interface API {
    ai: AI;
    downloader: Downloader;
    image: Image;

    media2buffer(input: any): Promise<Buffer>;

    minigame: Minigame;
    random: Random;
    search: Search;
    tools: Tools;
    stalk: Stalk;

    toURL(input: any): Promise<string>;
    raw(endpoint: string, payload?: AnyObject): Promise<AnyObject>;
  }

  // ======================
  // CLIENT
  // ======================

  interface Client {
    version: '1.3.3';
    api: API;
  }
}

// ======================
// EXPORT
// ======================

declare function brainxiex(config?: {
  apikey?: string;
  BASE?: string;
  session_local?: boolean;
}): Brainxiex.Client;

export = brainxiex;