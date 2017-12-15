    var whichpoke = "";
    var enemyPoke = "";
    var rand = Math.floor(Math.random() * 600);
    var pokeURL = "http://pokeapi.co/api/v2/pokemon/" + whichpoke;
    var moveURL = "http://pokeapi.co/api/v2/move/" + rand;
    var gamescreen = 0;
    var run = 0;
    var sixPoke = true;

    var rand;

    var switch1;
    var switch2;

    var pokesimulator1;
    var pokesimulator2;

    //Health Bar
    var a;
    var b;

    //determines if their is more than six pokemon
    var cool = 0;

    //The components of the pokemon objects
    var HP = "";
    var HP_E = "";
    var name = "";
    var nameE = "";
    var sprite = "";
    var sprite1 = "";
    var spriteE = "";
    var move1 = "";
    var move2 = "";
    var move3 = "";
    var move4 = "";
    var power1 = "";
    var power2 = "";
    var power3 = "";
    var power4 = "";
    var canvas;

    function Pokemon(Name, Type, figure, maxHP, hp, move1, power1, move2,
        power2, move3, power3, move4, power4) {
        this.Name = Name;
        this.Type = Type;
        this.figure = loadImage(figure);
        this.maxHP = maxHP;
        this.hp = hp;
        this.move1 = move1;
        this.power1 = power1;
        this.move2 = move2;
        this.power2 = power2;
        this.move3 = move3;
        this.power3 = power3;
        this.move4 = move4;
        this.power4 = power4
    }

    function EnemyPokemon(Name, Type, figure, maxHP, hp, move1, power1, move2,
        power2, move3, power3, move4, power4) {
        this.Name = Name;
        this.Type = Type;
        this.figure = loadImage(figure);
        this.maxHP = maxHP;
        this.hp = hp;
        this.move1 = move1;
        this.power1 = power1;
        this.move2 = move2;
        this.power2 = power2;
        this.move3 = move3;
        this.power3 = power3;
        this.move4 = move4;
        this.power4 = power4
    }

    var pokemons = [];
    var enemyPokemons = [];
    var pic;

    function setup() {
        pic = loadImage("poke.jpg");
        canvas = createCanvas(windowWidth, windowHeight);
        canvas.parent('sketch-holder');

    }

    function draw() {
        background(pic);
        if (run == 0) {

            initScreen();
            chooseThatPoke();
        }
        pokebattle();
        check();
    }

    function initScreen() {
        if (gamescreen == 0) {
            fill("white");
            textAlign(CENTER);
            textSize(50);
            text("Pokemon Battle" + "\n" + "Simulator", width / 2, height / 2);
            fill("white");

            textSize(40);
            text("Click To Play", width / 2, height / 2 + height / 3.2);


        }
    }

    function chooseThatPoke() {
        if (gamescreen == 1) {
            background("grey");
            $("#search").append("<h1 id='instruction'>Choose Your Six Pokemon</h1>" +
                "<input id='whichpoke' placeholder='Pokemon'/>" +
                "<button onclick='addpoke(); addEnemyPoke();'>Search!</button><br/>" +
                "<button onclick='battle()'>Start!</button>");
            run++;
        }
    }


    function addpoke() {
        windowResized();
        whichpoke = document.getElementById("whichpoke").value,
            pokeURL = "https://pokeapi.co/api/v2/pokemon/" + whichpoke + "/";
        $.get(pokeURL, function (data) {
            name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            sprite = data.sprites.front_default;
            sprite1 = data.sprites.back_default;
            HP = data.stats[5].base_stat;
            HP = HP * 4;
            moveA();
            poke(data);
        });
    }

    function addEnemyPoke() {
        enemyPoke = Math.floor(Math.random() * 600);
        pokeURL = "https://pokeapi.co/api/v2/pokemon/" + enemyPoke + "/";
        $.get(pokeURL, function (newdata) {
            nameE = newdata.name.charAt(0).toUpperCase() + newdata.name.slice(1);
            spriteE = newdata.sprites.front_default;
            HP_E = newdata.stats[5].base_stat;
            HP_E = HP_E * 4;
        });
    }

    function moveA() {
        rand = Math.floor(Math.random() * 600);
        moveURL = "https://pokeapi.co/api/v2/move/" + rand + "/";
        $.get(moveURL, function (data) {
            move1 = data.name;
            power1 = data.power;
            moveB();
        })

    }

    function moveB() {
        rand = Math.floor(Math.random() * 600);
        moveURL = "https://pokeapi.co/api/v2/move/" + rand + "/";
        $.get(moveURL, function (data) {
            move2 = data.name;
            power2 = data.power;
            moveC();
        })

    }

    function moveC() {
        rand = Math.floor(Math.random() * 600);
        moveURL = "https://pokeapi.co/api/v2/move/" + rand + "/";
        $.get(moveURL, function (data) {
            move3 = data.name;
            power3 = data.power;
            moveD();
        })

    }

    function moveD() {
        rand = Math.floor(Math.random() * 600);
        moveURL = "https://pokeapi.co/api/v2/move/" + rand + "/";
        $.get(moveURL, function (data) {
            move4 = data.name;
            power4 = data.power;
            for (var i = 0; i < 1; i++) {
                if (pokemons.length <= 6) {
                    pokemons.push(new Pokemon(name, "grass", sprite1, HP, HP, move1, power1, move2,
                        power2, move3, power3, move4, power4));
                    pokesimulator1 = pokemons[0];

                }
                if (enemyPokemons.length <= 6) {
                    enemyPokemons.push(new EnemyPokemon(nameE, "grass", spriteE, HP_E, HP_E, move1, power1, move2,
                        power2, move3, power3, move4, power4));
                    rand = enemyPokemons[0];
                }
            }
        })

    }

    function poke(data) {
        console.log(cool);
        console.log(pokemons.length);
        if (pokemons.length == 6) {
            cool = 1;
        } else if (cool == 0) {
            $("#pic").append("<img class='pic' data-toggle='modal' data-target='#myModal' onclick='makeModel()'src =" + sprite + ">");
            console.log("True");
        } else {
            alert("You can not have more than six pokemon");
        }
    }

    function makeModel() {
        $("#pic").append("<div class='modal fade' id='myModal' role='dialog>" +
            +"<div class='modal-dialog'>+<div class='modal-content'>" +
            "<div class='modal-header'>" +
            "<div class='modal-content'>" + "<div class='modal-header'>" +
            "<button type='button' class='close' data-dismiss='modal'>&times;</button>" +
            "<h4 class='modal-title'>Modal Header</h4>" +
            "</div>" +
            "<div class='modal-body'>" +
            "<p>Name: " + name + "</p>" +
            "</div>" +
            "<div class='modal-footer'>" +
            "<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>" +
            "</div>" +
            "</div></div></div></div></div>");
    }

    function battle() {
        if (enemyPokemons.length < 6) {
            alert("Your opponent is still  picking his six pokemon.");
        } else if (pokemons.length == 6) {
            gamescreen++;
        }
    }

    function pokebattle() {
        if (gamescreen == 2) {
            $("#search").empty();
            $("#pic").empty();

            background("#a3c2c2");
            fill("#C0C0C0");
            ellipse(windowWidth / 13.3, windowHeight / 1.25, 150, 50); //shadowx
            noFill();
            image(pokesimulator1.figure, windowWidth / 21.5, windowHeight / 1.4);

            fill("#C0C0C0");
            ellipse(windowWidth / 1.1, windowHeight / 7, 150, 50); //shadow
            noFill();
            image(rand.figure, windowWidth / 1.145, windowHeight / 16);

            //Health and name for the user's pokemon displayed
            textSize(30);
            fill('black');
            text("HP: " + pokesimulator1.hp, windowWidth / 5.5, windowHeight / 1.18);
            text(pokesimulator1.Name, windowWidth / 5.5, windowHeight / 1.3);
            //health bar for your pokemon
            fill("white");
            rect(windowWidth / 7.5, windowHeight / 1.28, 100, 15);
            fill("green");
            rect(windowWidth / 7.5, windowHeight / 1.28, ((((pokesimulator1.hp) / pokesimulator1.maxHP) * 100)), 15);

            //Health and name for the enemy's pokemon displayed
            fill("black");
            textSize(30);
            text("HP: " + rand.hp, windowWidth / 1.25, windowHeight / 6.2);
            text(rand.Name, windowWidth / 1.25, windowHeight / 10.5);

            //health bar for the enemy's pokemon
            fill("white");
            rect(windowWidth / 1.28, windowHeight / 10, 100, 15);
            fill("green");
            rect(windowWidth / 1.28, windowHeight / 10, ((((rand.hp) / rand.maxHP) * 100)), 15);

            fill("red");
            rect(width - width, height - 90, windowWidth, 100);

            fill("black");
            textSize(20);
            text(pokesimulator1.move1, 85, windowHeight / 1.05);
            text(pokesimulator1.move2, 285, windowHeight / 1.05);
            text(pokesimulator1.move3, 485, windowHeight / 1.05);
            text(pokesimulator1.move4, 695, windowHeight / 1.05);
            noFill();

            noFill();
            rect(25, windowHeight / 1.1, 150, 35);
            rect(225, windowHeight / 1.1, 150, 35);
            rect(425, windowHeight / 1.1, 150, 35);
            rect(625, windowHeight / 1.1, 150, 35);
        }
    }

    function check() {
        for (var i = 0; i < pokemons.length; i++) {
            if (pokemons[i].hp <= 0) {
                pokemons[i].hp = 0;
                pokemons.splice(i, 1);
                console.log(pokemons);
                pokesimulator1 = pokemons[i];
            }
            if (pokemons[i] == 0) {
                fill("white");
                rect(0, 0, 799, 799);
                fill("black");
                textAlign(CENTER);
                textSize(20);
                text("All your Pokemon's have fainted", 250, 250);
            }
        }
        for (var i = 0; i < enemyPokemons.length; i++) {
            if (enemyPokemons[i].hp <= 0) {
                enemyPokemons[i].hp = 0;
                enemyPokemons.slice(i, 1);
                rand = enemyPokemons[i];
                console.log(enemyPokemons);
                if (enemyPokemons[i] == 0) {
                    fill("white");
                    rect(0, 0, 799, 799);
                    fill("black");
                    textAlign(CENTER);
                    textSize(20);
                    text("All your Opponents's pokemon have fainted", 250, 250);
                }
            }
        }
    }

    function mousePressed() {
        if (gamescreen == 0) {
            if (mouseX >= width - width + 20 && mouseX <= width - 30 && mouseY >= height / 2 + height / 4 && mouseY <= height / 2 + height / 4 + 100) {
                gamescreen++;
            }
        }
        if (gamescreen == 2) {
            if (mouseY >= 750 && mouseY <= 785 && mouseX >= 25 && mouseX <= 150) {
                pokesimulator1.hp = pokesimulator1.hp - Math.floor(random(0, rand.power1)); //attack for first pokemon

                rand.hp = rand.hp - Math.floor(random(0, pokesimulator1.power1)); //attack for the second pokemon
            }
            if (mouseY >= 750 && mouseY <= 785 && mouseX >= 225 && mouseX <= 350) {
                pokesimulator1.hp = pokesimulator1.hp - Math.floor(random(0, rand.power2)); //attack for first pokemon

                rand.hp = rand.hp - Math.floor(random(0, pokesimulator1.power2)); //attack for the second pokemon
            }
            if (mouseY >= 750 && mouseY <= 785 && mouseX >= 425 && mouseX <= 550) {
                pokesimulator1.hp = pokesimulator1.hp - Math.floor(random(0, rand.power3)); //attack for first pokemon

                rand.hp = rand.hp - Math.floor(random(0, pokesimulator1.power3)); //attack for the second pokemon
            }
            if (mouseY >= 750 && mouseY <= 785 && mouseX >= 625 && mouseX < 750) {
                pokesimulator1.hp = pokesimulator1.hp - Math.floor(random(0, rand.power4)); //attack for first pokemon

                rand.hp = rand.hp - Math.floor(random(0, pokesimulator1.power4)); //attack for the second pokemon
            }
        }
    }

    function windowResized() {
        canvas = resizeCanvas(windowWidth, windowHeight);
        background("yellow");
    }
