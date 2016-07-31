/* @flow */

import * as Immutable from 'immutable';

export type Message = {
  channel: string,
  event: string,
  match: Array<string>,
  team: string,
  text: string,
  ts: string,
  user: string,
};
export type Attachments = Array<Object>;
type Response = {
  attachments?: Attachments,
  text?: string,
};
type MessageType = 'direct_message' | 'ambient' | 'direct_mention' | 'mention';
export type MessageTypes = 'message_received' | Array<MessageType>;
export type Pattern = string | RegExp;
type Patterns = Array<Pattern> | Immutable.List<Pattern>;
export type AsyncPatterns = Patterns | Promise<Patterns>;

type StoredObjectID = string;
type StoredObject = {
  id: StoredObjectID,
} & {[key: string]: any};
type ErrorCallback = (err: Object) => void;
type DataCallback = (err: Object, data: StoredObject) => void;
type AllDataCallback = (err: Object, data: Array<StoredObject>) => void;
type StorageStore = {
  save: (object: StoredObject, errCb: ErrorCallback) => void,
  get: (id: StoredObjectID, dataCb: DataCallback) => void,
  all: (allDataCb: AllDataCallback) => void,
};
type Storage = {
  channels: StorageStore,
  teams: StorageStore,
  users: StorageStore,
};

export type Logger = {
  info: (message: string) => void,
  warning: (message: string) => void,
  error: (message: string) => void,
}

export type SlackBot = {
  reply: (message: Message, response: string|Response) => void,
};

export type Hook = (bot: SlackBot, message: Message) => void;

export type Controller = {
  log: Logger,
  hears: (patterns: Patterns, messageTypes: MessageTypes, hook: Hook) => mixed,
  spawn: (options: {token: string}) => any,
  storage: Storage,
};

export interface Interaction {
  patterns: AsyncPatterns;
  messageTypes: MessageTypes;
  hook: Hook;
}

export type Company = {
  id: number,
  name: string,
  trello_id: string,
  trello_url: string,
};
