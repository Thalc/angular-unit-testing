import { TestBed } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('HeroService', () => {
    let httpTestingController: HttpTestingController;
    let mockMessageService;
    let heroService: HeroService;

    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add']);
        
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HeroService,
                { provide: MessageService, useValue: mockMessageService }
            ]
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        heroService = TestBed.inject(HeroService);
    })

    describe('getHero', () => {
        it('should call get with the correct URL', () => {
            //call getHero
            heroService.getHero(1).subscribe(hero => {
                expect(hero).toBeDefined();
                expect(hero.id).toBe(1);
            });

            //expect get to be called with the correct URL
            const req = httpTestingController.expectOne('api/heroes/1');

            req.flush({ id: 1, name: 'SpiderDude', strength: 8 });

            //verify that there are no outstanding requests
            expect(req.request.method).toBe('GET');
            httpTestingController.verify();

            expect(mockMessageService.add).toHaveBeenCalled();
        })
    })
})