import { MessageService } from './message.service';

describe('MessageService', () => {
    let service: MessageService;

    beforeEach(() => {
        service = new MessageService();
    }
    );

    it('should add a message', () => {
        service.add('message');
        expect(service.messages.length).toBe(1);
    });

    it('should clear messages', () => {
        service.add('message');
        service.clear();
        expect(service.messages.length).toBe(0);
    });
});