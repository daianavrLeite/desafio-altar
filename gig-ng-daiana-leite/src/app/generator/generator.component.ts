import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { formatDate } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { stringify, parse } from 'querystring';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, scan, startWith, tap } from 'rxjs/operators';
import { AppService } from '../services/service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {

  @Input() nomeBehaviorSubject: BehaviorSubject<string>;

  alphabet: any[];
  matrizAlphabet = new Array(10);
  isgeneratedGrid = false;
  character = "";
  repeatedLetters = 0;
  countLetter = 0;
  isCode = false;
  yourCode = 0;
  countFirstLetter = 0;
  countSecondLetter = 0;

  textControl = new FormControl();
  history$: Observable<string[]>;

  @ViewChild('hrHand', { static: false }) hrHand: ElementRef;
  @ViewChild('minHand', { static: false }) minHand: ElementRef;
  @ViewChild('secHand', { static: false }) secHand: ElementRef;

  constructor(private appService: AppService) {
    this.history$ = this.textControl.valueChanges.pipe(
      startWith(this.character),
      scan((acc, t) => t ? acc.concat(t) : [], [])
    );
  }


  getSeconds = n => {
    return ('0' + n).slice(-2);
  }

  /* SetInterval para chamar a funcao updateClock de 1 em 1 segundo */
  interval = setInterval(() => {
    const now = new Date();
    this.updateClock(now);
  }, 1000);


  updateClock(date) {
    this.secHand.nativeElement.style.transform = 'rotate(' +
      date.getSeconds() * 6 + 'deg)';
    this.minHand.nativeElement.style.transform = 'rotate(' +
      date.getMinutes() * 6 + 'deg)';
    this.hrHand.nativeElement.style.transform = 'rotate(' +
      (date.getHours() * 30 + date.getMinutes() * 0.5) + 'deg)';
  }

  generateMatriz() {
    this.countLetter = 0;
    this.isgeneratedGrid = true;
    this.alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    for (let i = 0; i < 10; i++) {
      this.matrizAlphabet[i] = new Array(10);
    }

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let letter = this.alphabet[Math.round(Math.random() * 25)];
        this.matrizAlphabet[i][j] = letter;
        if (this.alphabet.indexOf(this.character) < 0) {
          if (this.character == letter) {
            this.countLetter++;
          }
        }
      }
    }

    this.characterSubstitution();
    this.generateCode();
  }

  characterSubstitution() {
    if (this.countLetter >= 1) {
      this.repeatedLetters = 20 - this.countLetter;
      while (this.repeatedLetters > 0) {
        let p1 = Math.floor(Math.random() * 10);
        let p2 = Math.floor(Math.random() * 10);
        let letraMatriz = this.matrizAlphabet[p1][p2];
        if (letraMatriz != this.character) {
          this.matrizAlphabet[p1][p2] = this.character;
          this.repeatedLetters--;
        }
      }
      // console.log("MATRIZ COM O VALOR REQUERIDO:", this.matrizAlphabet)
    }
  }

  updateGrid(isUpdate: boolean) {
    if (isUpdate == true) {
      this.generateMatriz();
    }
  }

  generateCode() {
    this.isCode = true;
    let code;
    const now = new Date();
    code = this.getSeconds(now.getSeconds());
    // console.log("segundos", code);
    let arrayCode = code.split("");
    let codePosition0 = parseInt(arrayCode[0]);
    let codePosition1 = parseInt(arrayCode[1]);
    let firstLetter = this.matrizAlphabet[codePosition0][codePosition1];
    let secondLetter = this.matrizAlphabet[codePosition1][codePosition0];
    this.countFirstLetter = 0;
    this.countSecondLetter = 0

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.matrizAlphabet[i][j] == firstLetter) {
          this.countFirstLetter++;
        }
        if (this.matrizAlphabet[i][j] == secondLetter) {
          this.countSecondLetter++;
        }
      }
    }

    if (this.countFirstLetter > 9) {
      this.countFirstLetter = this.checkBigger(this.countFirstLetter);
    }
    if (this.countSecondLetter > 9) {
      this.countSecondLetter = this.checkBigger(this.countSecondLetter);
    }

    this.appService.changeCode(this.countFirstLetter.toString() + this.countSecondLetter.toString());
    // console.log("changeCode", this.countFirstLetter.toString() + this.countSecondLetter.toString());
    this.appService.matriz(this.matrizAlphabet);
    // console.log("this.appService.matriz(this.mat1)", this.matrizAlphabet);
  }

  checkBigger(countLetter:number) {
    let divideBy = 2;
    let division = 0;
    while (true) {
      division = countLetter / divideBy;
      if (division > 9) {
        division = division / divideBy + 1;
      } else {
        return Math.floor(division);
      }
    }
  }

  ngOnInit() {
    setInterval(() => { this.character = ""; }, 4000);
    setInterval(() => { this.updateGrid(this.isgeneratedGrid); }, 2000);
  }

  startGrid() {
    this.isgeneratedGrid = true;
    this.generateMatriz();
  }
}
