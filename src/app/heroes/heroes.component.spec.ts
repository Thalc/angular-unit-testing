import { Component, Input } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";

@Component({
    selector: 'app-hero',
    template: '<div></div>'
  })
  export class FakeHeroComponent {
    @Input() hero: Hero;
    //@Output() delete = new EventEmitter();
}

describe('HeroesComponent', () => {
    let HEROES;
    let mockHeroService;
    let fixture: ComponentFixture<HeroesComponent>;

    beforeEach(() => {
        HEROES = [
            { id: 1, name: 'SpiderDude', strength: 8 },
            { id: 2, name: 'Wonderful Woman', strength: 24},
        ]

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])

        TestBed.configureTestingModule({
            declarations: [HeroesComponent, FakeHeroComponent],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ]
        })

        fixture = TestBed.createComponent(HeroesComponent);
    })


    it('should set heroes correctly from the service', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        expect(fixture.componentInstance.heroes.length).toBe(2);
    })

    it('should create one line for each hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(2);
    })

    it('should remove the indicated hero from heroes list', () => {
        mockHeroService.deleteHero.and.returnValue(of(true));
        fixture.componentInstance.heroes = HEROES;
        fixture.componentInstance.deleteHero(HEROES[1]);
        expect(fixture.componentInstance.heroes.length).toBe(1);
        expect(fixture.componentInstance.heroes[0]).toBe(HEROES[0]);
    })

    it('should call deleteHero', () => {
        mockHeroService.deleteHero.and.returnValue(of(true));
        fixture.componentInstance.heroes = HEROES;
        fixture.componentInstance.deleteHero(HEROES[1]);

        expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[1]);
    })
})