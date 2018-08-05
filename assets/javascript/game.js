function createCharacter(name, healthPoints, baseAttack, counterAttackPower, 
        portraitImg, backgroundImg, attackImg, loseImg, winImg){

    return {
        name: name,
        healthPoints: healthPoints,
        baseAttack: baseAttack,
        attackPower: 0,
        counterAttackPower: counterAttackPower,
        portraitImg: portraitImg,
        backgroundImg: backgroundImg,
        attackImg: attackImg,
        loseImg: loseImg,
        winImg: winImg,
    }

};

var game = {
    characters: [
        createCharacter('Ahsoka', 1000, 50, 50, '', '', '', '', ''),
        createCharacter('Boba Fett', 200, 10, 15, '', '', '', '', ''),
        createCharacter('Rey', 500, 20, 30, '', '', '', '', ''),
        createCharacter('Vader', 900, 25, 40, '', '', '', '', ''),
        createCharacter('Yoda', 1500, 40, 40, '', '', '', '', '')
    ],
    player: {},
    NPC: {},

    characterSelect: function(character){
        this.player = character;
    },

    NPCSelect: function(character){
        this.NPC = character
    },

    attack: function(){
        this.player.attackPower += this.player.baseAttack;
        this.NPC.healthPoints -= this.player.attackPower;
        if(this.NPC.healthPoints <= 0){
            $( document ).trigger("npcDied");
        }else{
            this.player.healthPoints -= this.NPC.counterAttackPower;
        }
    }

};

$(document).ready(function(){
    var current = Object.create(game);

    
});