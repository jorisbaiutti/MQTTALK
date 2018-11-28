export class Message {
  constructor(
    public text: string,
    public sent: string,
    public from: string,
    public to: string,
    public fromMe: boolean
  ) {}
}
