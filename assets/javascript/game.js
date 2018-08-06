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
        createCharacter('Ahsoka', 1000, 50, 50, 'assets/images/ahsoka/portrait.png',
            'assets/images/ahsoka/background.jpg', 'assets/images/ahsoka/attack.gif',
            'assets/images/ahsoka/lose.gif', 'assets/images/ahsoka/win.gif'),
        createCharacter('Boba Fett', 200, 10, 15, 'assets/images/boba/portrait.png',
            'assets/images/boba/background.jpg', 'assets/images/boba/attack.gif',
            'assets/images/boba/lose.gif', 'assets/images/boba/win.gif'),
        createCharacter('Rey', 500, 20, 30, 'assets/images/rey/portrait.png',
            'assets/images/rey/background.jpg', 'assets/images/rey/attack.gif',
            'assets/images/rey/lose.gif', 'assets/images/rey/win.gif'),
        createCharacter('Vader', 900, 25, 40, 'assets/images/vader/portrait.png',
            'assets/images/vader/background.jpg', 'assets/images/vader/attack.gif',
            'assets/images/vader/lose.gif', 'assets/images/vader/win.gif'),
        createCharacter('Yoda', 1500, 40, 40, 'assets/images/yoda/portrait.png',
            'assets/images/yoda/background.jpg', 'assets/images/yoda/attack.gif',
            'assets/images/yoda/lose.gif', 'assets/images/yoda/win.gif')
    ],
    player: '',
    NPC: '',

    attack: function(){
        this.player.attackPower += this.player.baseAttack;
        this.NPC.healthPoints -= this.player.attackPower;
        if(this.NPC.healthPoints <= 0){
            this.NPC = '';
        }else{
            this.player.healthPoints -= this.NPC.counterAttackPower;
        }
    }

};

$(document).ready(function(){
    var current = Object.create(game);
    $('#instructions').text('Select your chracter.');
    $('#attackButton').click(function(){
        $('#playerImg').attr('src', current.player.attackImg);
        $('#npcImg').attr('src', current.NPC.attackImg);
        setTimeout(function(){
            drawPlayer();
            drawNPC();
        }, 1000);
        current.attack();
        drawCharacters();
    });
    drawCharacters();

    function drawCharacters(){
        $('#characterSelect').empty();
        current.characters.forEach(function(character, index) {
            var characterBox = $('<div>');
            characterBox.addClass('col-2 characterPortrait text-center');
            characterBox.attr('data-character', index);
            characterBox.html('<div>' + character.name + '</div><img class="img-fluid" src="'+
                character.portraitImg +'" /><div>'+ character.healthPoints +'</div>');
            characterBox.click(function(event){
                if(!current.player){
                    current.player = current.characters[parseInt($(this).data("character"))];
                    current.characters.splice(parseInt($(this).data("character")), 1);
                    drawPlayer();
                }else if(!current.NPC){
                    $('#npc').empty();
                    current.NPC = current.characters[parseInt($(this).data("character"))];
                    current.characters.splice(parseInt($(this).data("character")), 1);
                    drawNPC();
                }
                drawCharacters();
            });
            $('#characterSelect').append(characterBox);
        });
        if(current.player && current.NPC){
            $('#characterSelect').hide();
            $('#attackButton').show();
        }else if(current.characters.length === 0){
            $('#instructions').text('Congratulations, you won.');
            $('#npc').empty();
        }else{
            $('#npc').empty();
            $('#instructions').text('Select your openent.');
            $('#characterSelect').show();
            $('#attackButton').hide();
        }
    };

    function drawPlayer(){
        $('#playerCharacter').empty();
        var characterBox = $('<div>');
        characterBox.addClass('characterPortrait text-center');
        characterBox.html('<div>' + current.player.name + '</div><img id="playerImg" class="img-fluid" src="'+
            current.player.portraitImg +'" /><div>'+ current.player.healthPoints +'</div>');
        $('#playerCharacter').append(characterBox);
        $('#instructions').text('Select your openent.');
    };

    function drawNPC(){
        $('#npc').empty();
        if(current.NPC){
        var characterBox = $('<div>');
        characterBox.addClass('characterPortrait text-center');
        characterBox.html('<div>' + current.NPC.name + '</div><img id="npcImg" class="img-fluid" src="'+
            current.NPC.portraitImg +'" /><div>'+ current.NPC.healthPoints +'</div>');
        $('#npc').append(characterBox);
        $('#instructions').text('Attack your openent.');
        }
    };


});