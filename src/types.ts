export interface PhotoMemory {
  id: string;
  url: string;
  title: string;
  caption: string;
  date?: string;
}

export interface LoveMessage {
  recipientName: string;
  senderName: string;
  headline: string;
  body: string[];
  signature: string;
  specialDate?: string;
}

export interface LoveReason {
  id: string;
  text: string;
  icon?: string;
}
