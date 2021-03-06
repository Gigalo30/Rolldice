import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../Game';
import * as $ from 'jquery';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})


export class ContentComponent implements OnInit {

  constructor() { }
  dice="images/dice/side_1.png"
 
  roll_button(){}

  @Input () contentInfo: Game;
  
  ngOnInit(): void {

    const maxNumberOfDice = 1; 
    let game = new Game(); 
    game.rollDice();
    
    let numberOfDice = 1; 
    console.log(game);
    
    let $select; 
    let $dice; 
    let $total; 
    
   
    let images = [];
    for (let i = 1; i <= 1; i++) {
        let image = new Image();
        image.src = dieImageSrc(0);
        images.push(image);
    }
    
    
    $(document).ready(function(){
        
        $select = $("select");
        $dice = $("#dice");
        $total = $("#total");
        insertSelectOptions();
        insertImages();
        updateTotal();
        handleSelectionChanges();
        handleRollButtonClicks();
      
    });

    
    function dieImageSrc(side) {
        
        return `src/images/dice/side_${side}.png`;
    
    }
    
    

    function insertImages() {
        for (let die of game.dice) {
            let side = die.side;
            let src = dieImageSrc(side);
            $dice.append(`<img src="${src}" alt="side ${side}">`);
            
        }
    }
    
    function insertSelectOptions() {
        for (let i = 1; i <= maxNumberOfDice; i++) {
            $select.append(`<option value="${i}" ${(i === numberOfDice)?'selected':''}>${i}</option>`);
        }
    }

    
    function handleSelectionChanges() {
        $select.change(function () {
            console.log("the change event handler is called");
            let count = parseInt($select.val());
            if (count !== numberOfDice) {
                numberOfDice = count;
                game = new Game(count);
                game.rollDice();
                $dice.html("");
                insertImages();
                updateTotal();
                saveSides();
            }
        });
    }
    
    
    function updateTotal() {
        $total.text(game.total);
    }

    function saveSides() {  
        console.log("Searching for image");
       
    }
    
    function handleRollButtonClicks() {
        $("#roll_button").click(function () {
            console.log("the click event handler is called");
            game.rollDice();
            $dice.find("img").each(function(index){
                 let side = game.dice[index].side;
                 let src = dieImageSrc(side);
                $(this).attr("src", src).attr("alt", `side ${side}`);
            });
            updateTotal();
            saveSides();
        });
    }
    
  }
 
}



