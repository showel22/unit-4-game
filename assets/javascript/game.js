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
    characters: [],
    player: '',
    NPC: '',

    attack: function(){
        this.player.attackPower += this.player.baseAttack;
        this.NPC.healthPoints -= this.player.attackPower;
        if(this.NPC.healthPoints <= 0){
            this.NPC = '';
        }else if(this.player.healthPoints <= 0){
            this.player = '';
        }else{
            this.player.healthPoints -= this.NPC.counterAttackPower;
        }
    },

    reset: function(){
        this.player = '';
        this.NPC = '';
        this.characters = [createCharacter('Ahsoka', 1000, 50, 50, 'assets/images/ahsoka/portrait.png',
            'assets/images/ahsoka/background.jpg', 'assets/images/ahsoka/attack.gif',
            'assets/images/ahsoka/lose.gif', 'assets/images/ahsoka/win.gif'),
        createCharacter('Boba Fett', 500, 30, 15, 'assets/images/boba/portrait.png',
            'assets/images/boba/background.jpg', 'assets/images/boba/attack.gif',
            'assets/images/boba/lose.gif', 'assets/images/boba/win.gif'),
        createCharacter('Rey', 600, 40, 30, 'assets/images/rey/portrait.png',
            'assets/images/rey/background.jpg', 'assets/images/rey/attack.gif',
            'assets/images/rey/lose.gif', 'assets/images/rey/win.gif'),
        createCharacter('Vader', 900, 50, 40, 'assets/images/vader/portrait.png',
            'assets/images/vader/background.jpg', 'assets/images/vader/attack.gif',
            'assets/images/vader/lose.gif', 'assets/images/vader/win.gif'),
        createCharacter('Yoda', 1500, 60, 40, 'assets/images/yoda/portrait.png',
            'assets/images/yoda/background.jpg', 'assets/images/yoda/attack.gif',
            'assets/images/yoda/lose.gif', 'assets/images/yoda/win.gif')];
    }

};

$(document).ready(function(){
    var current = Object.create(game);
    var first = true;
    startGame();

    function startGame(){
        first = true;
        current.reset();
        $('#attackButton').click(function(){
            if(current.NPC){
                $('#playerImg').attr('src', current.player.attackImg);
                $('#npcImg').attr('src', current.NPC.attackImg);
                $('#attackButton button').prop('disabled', true);
                setTimeout(function(){
                    drawPlayer();
                    drawNPC();
                    $('#attackButton button').prop('disabled', false);
                }, 1000);
                current.attack();
                drawCharacters();
            }
        });
        drawCharacters();
    };

    function drawCharacters(){
        if(current.player && current.NPC){
            $('#characterSelect').hide();
            $('#attackButton').show();
        }else if(current.characters.length === 0){
            $('#instructions').text('Congratulations, you won.');
            startGame();
            $('#npc').empty();
        }else if(!current.player && !first){
            $('#instructions').text('You Lose. Refresh to start over.');
            startGame();
        }else if(!current.NPC && !current.player){
            $('#instructions').text('Select your chracter.');
            buildCharacterList();
        }else if(!current.NPC){
            first = false;
            $('#npc').empty();
            $('#instructions').text('Select your opponent.');
            buildCharacterList();
        }else{
            $('#instructions').text('Attack your openent.');
        }
    };

    function drawPlayer(){
        $('#playerCharacter').empty();
        if(current.player){
            var characterBox = $('<div>');
            characterBox.addClass('characterPortrait text-center');
            characterBox.html('<div>' + current.player.name + '</div><img id="playerImg" class="img-fluid" src="'+
            current.player.portraitImg +'" /><div>'+ current.player.healthPoints +'</div>');
            $('#playerCharacter').append(characterBox);
        }
        
    };

    function drawNPC(){
        $('#npc').empty();
        if(current.NPC){
            var characterBox = $('<div>');
            characterBox.addClass('characterPortrait text-center');
            characterBox.html('<div>' + current.NPC.name + '</div><img id="npcImg" class="img-fluid" src="'+
                current.NPC.portraitImg +'" /><div>'+ current.NPC.healthPoints +'</div>');
            $('#npc').append(characterBox);
        }
    };

    function buildCharacterList(){
        $('#characterSelect').show();
        $('#attackButton').hide();

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
                    $('body').css('background-image', 'url(' + current.NPC.backgroundImg + ')');
                    drawNPC();
                }
                drawCharacters();
            });
            $('#characterSelect').append(characterBox);
        });
    };


});