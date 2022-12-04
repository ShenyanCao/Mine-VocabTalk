#!/usr/bin/env python

import json
import urllib.request
import os
import base64
import copy

data = """
[
    {
    "categoryID":"01",
    "categoryName": "Domestic Animals",
    "categoryImage": "https://kids-flashcards.com/collages/domestic-animals-english-flashcards-640.jpg",
    "categoryList":[
      {
        "pictureID": "01-01",
        "pictureWord":"turtle",
        "pictureURL": "https://kids-flashcards.com/images/en/1/cards/picture-flashcard/turtle.jpg"
      },
      {
        "pictureID": "01-02",
        "pictureWord":"canary",
        "pictureURL": "https://kids-flashcards.com/images/en/1/cards/picture-flashcard/canary.jpg"
      },
      {
        "pictureID": "01-03",
        "pictureWord":"cat",
        "pictureURL": "https://kids-flashcards.com/images/en/1/cards/picture-flashcard/cat.jpg"
      },
      {
        "pictureID": "01-04",
        "pictureWord":"dog",
        "pictureURL": "https://kids-flashcards.com/images/en/1/cards/picture-flashcard/dog.jpg"
      },
      {
        "pictureID": "01-05",
        "pictureWord":"fish",
        "pictureURL": "https://kids-flashcards.com/images/en/1/cards/picture-flashcard/fish.jpg"
      },
      {
        "pictureID": "01-06",
        "pictureWord":"parrot",
        "pictureURL": "https://kids-flashcards.com/images/en/1/cards/picture-flashcard/parrot.jpg"
      },
      {
        "pictureID": "01-07",
        "pictureWord":"mouse",
        "pictureURL": "https://kids-flashcards.com/images/en/1/cards/picture-flashcard/mouse.jpg"
      },
      {
        "pictureID": "01-08",
        "pictureWord":"guinea pig",
        "pictureURL": "https://kids-flashcards.com/images/en/1/cards/picture-flashcard/guinea-pig.jpg"
      },
      {
        "pictureID": "01-09",
        "pictureWord":"hamster",
        "pictureURL": "https://kids-flashcards.com/images/en/1/cards/picture-flashcard/hamster.jpg"
      },
      {
        "pictureID": "01-10",
        "pictureWord":"chinchilla",
        "pictureURL": "https://kids-flashcards.com/images/en/1/cards/picture-flashcard/chinchilla.jpg"
      }
    ]
  },
  {
    "categoryID":"02",
    "categoryName":"Farm Animals",
    "categoryImage":"https://kids-flashcards.com/collages/farm-animals-english-flashcards-640.jpg",
    "categoryList":[
       {
        "pictureID": "02-01",
        "pictureWord":"donkey",
        "pictureURL": "https://kids-flashcards.com/images/en/2/cards/picture-flashcard/donkey.jpg"
      },
      {
        "pictureID": "02-02",
        "pictureWord":"camel",
        "pictureURL": "https://kids-flashcards.com/images/en/2/cards/picture-flashcard/camel.jpg"
      },
      {
        "pictureID": "02-03",
        "pictureWord":"cow",
        "pictureURL": "https://kids-flashcards.com/images/en/2/cards/picture-flashcard/cow.jpg"
      },
      {
        "pictureID": "02-04",
        "pictureWord":"horse",
        "pictureURL": "https://kids-flashcards.com/images/en/2/cards/picture-flashcard/horse.jpg"
      },
      {
        "pictureID": "02-05",
        "pictureWord":"pig",
        "pictureURL": "https://kids-flashcards.com/images/en/2/cards/picture-flashcard/pig.jpg"
      },
      {
        "pictureID": "02-06",
        "pictureWord":"bull",
        "pictureURL": "https://kids-flashcards.com/images/en/2/cards/picture-flashcard/bull.jpg"
      },
      {
       "pictureID": "02-07",
       "pictureWord":"goat",
       "pictureURL": "https://kids-flashcards.com/images/en/2/cards/picture-flashcard/goat.jpg"
     },
     {
       "pictureID": "02-08",
       "pictureWord":"rabbit",
       "pictureURL": "https://kids-flashcards.com/images/en/2/cards/picture-flashcard/rabbit.jpg"
     },
     {
       "pictureID": "02-09",
       "pictureWord":"sheep",
       "pictureURL": "https://kids-flashcards.com/images/en/2/cards/picture-flashcard/sheep.jpg"
     },
     {
       "pictureID": "02-10",
       "pictureWord":"bee",
       "pictureURL": "https://kids-flashcards.com/images/en/2/cards/picture-flashcard/bee.jpg"
     },
     {
       "pictureID": "02-11",
       "pictureWord":"pony",
       "pictureURL": "https://kids-flashcards.com/images/en/2/cards/picture-flashcard/pony.jpg"
     },
     {
       "pictureID": "02-12",
       "pictureWord":"ram",
       "pictureURL": "https://kids-flashcards.com/images/en/2/cards/picture-flashcard/ram.jpg"
     },
     {
      "pictureID": "02-13",
      "pictureWord":"reindeer",
      "pictureURL": "https://kids-flashcards.com/images/en/2/cards/picture-flashcard/reindeer.jpg"
    },
    {
      "pictureID": "02-14",
      "pictureWord":"lama",
      "pictureURL": "https://kids-flashcards.com/images/en/2/cards/picture-flashcard/lama.jpg"
    },
    {
      "pictureID": "02-15",
      "pictureWord":"coypu",
      "pictureURL": "https://kids-flashcards.com/images/en/2/cards/picture-flashcard/coypu.jpg"
    }
    ]
  },
  {
    "categoryID":"03",
    "categoryName": "Sea Animals",
    "categoryImage":"https://kids-flashcards.com/collages/sea-animals-english-flashcards-640.jpg",
    "categoryList":[
       {
        "pictureID": "03-01",
        "pictureWord":"stingray",
        "pictureURL": "https://kids-flashcards.com/images/en/10/cards/picture-flashcard/stingray.jpg"
      },
      {
        "pictureID": "03-02",
        "pictureWord":"octopus",
        "pictureURL": "https://kids-flashcards.com/images/en/10/cards/picture-flashcard/octopus.jpg"
      },
      {
        "pictureID": "03-03",
        "pictureWord":"seaweed",
        "pictureURL": "https://kids-flashcards.com/images/en/10/cards/picture-flashcard/seaweed.jpg"
      },
      {
        "pictureID": "03-04",
        "pictureWord":"starfish",
        "pictureURL": "https://kids-flashcards.com/images/en/10/cards/picture-flashcard/starfish.jpg"
      },
      {
        "pictureID": "03-05",
        "pictureWord":"coral",
        "pictureURL": "https://kids-flashcards.com/images/en/10/cards/picture-flashcard/coral.jpg"
      },
      {
        "pictureID": "03-06",
        "pictureWord":"shell",
        "pictureURL": "https://kids-flashcards.com/images/en/10/cards/picture-flashcard/shell.jpg"
      },
      {
       "pictureID": "03-07",
       "pictureWord":"orca",
       "pictureURL": "https://kids-flashcards.com/images/en/10/cards/picture-flashcard/killer-whale.jpg"
     },
     {
       "pictureID": "03-08",
       "pictureWord":"sea urchin",
       "pictureURL": "https://kids-flashcards.com/images/en/10/cards/picture-flashcard/sea-urchin.jpg"
     },
     {
       "pictureID": "03-09",
       "pictureWord":"seahorse",
       "pictureURL": "https://kids-flashcards.com/images/en/10/cards/picture-flashcard/seahorse.jpg"
     },
     {
       "pictureID": "03-10",
       "pictureWord":"dolphin",
       "pictureURL": "https://kids-flashcards.com/images/en/10/cards/picture-flashcard/dolphin.jpg"
     },
     {
       "pictureID": "03-11",
       "pictureWord":"crayfish",
       "pictureURL": "https://kids-flashcards.com/images/en/10/cards/picture-flashcard/crayfish.jpg"
     },
     {
       "pictureID": "03-12",
       "pictureWord":"nautilus",
       "pictureURL": "https://kids-flashcards.com/images/en/10/cards/picture-flashcard/nautilus.jpg"
     },
     {
      "pictureID": "03-13",
      "pictureWord":"sea turtle",
      "pictureURL": "https://kids-flashcards.com/images/en/10/cards/picture-flashcard/sea-turtle.jpg"
    },
    {
      "pictureID": "03-14",
      "pictureWord":"shark",
      "pictureURL": "https://kids-flashcards.com/images/en/10/cards/picture-flashcard/shark.jpg"
    },
    {
      "pictureID": "03-15",
      "pictureWord":"shrimp",
      "pictureURL": "https://kids-flashcards.com/images/en/10/cards/picture-flashcard/shrimp.jpg"
    },
    {
      "pictureID": "03-16",
      "pictureWord":"snail",
      "pictureURL": "https://kids-flashcards.com/images/en/10/cards/picture-flashcard/snail.jpg"
    },
    {
      "pictureID": "03-17",
      "pictureWord":"whale",
      "pictureURL": "https://kids-flashcards.com/images/en/10/cards/picture-flashcard/whale.jpg"
    },
    {
      "pictureID": "03-18",
      "pictureWord":"sea anemone",
      "pictureURL": "https://kids-flashcards.com/images/en/10/cards/picture-flashcard/sea-anemone.jpg"
    },
    {
     "pictureID": "03-19",
     "pictureWord":"squid",
     "pictureURL": "https://kids-flashcards.com/images/en/10/cards/picture-flashcard/squid.jpg"
   },
   {
     "pictureID": "03-20",
     "pictureWord":"crab",
     "pictureURL": "https://kids-flashcards.com/images/en/10/cards/picture-flashcard/crab.jpg"
   },
   {
     "pictureID": "03-21",
     "pictureWord":"jellyfish",
     "pictureURL": "https://kids-flashcards.com/images/en/10/cards/picture-flashcard/jellyfish.jpg"
   },
   {
     "pictureID": "03-22",
     "pictureWord":"lobster",
     "pictureURL": "https://kids-flashcards.com/images/en/10/cards/picture-flashcard/lobster.jpg"
   },
   {
     "pictureID": "03-23",
     "pictureWord":"narwhal",
     "pictureURL": "https://kids-flashcards.com/images/en/10/cards/picture-flashcard/narwhal.jpg"
   },
   {
     "pictureID": "03-24",
     "pictureWord":"seal",
     "pictureURL": "https://kids-flashcards.com/images/en/10/cards/picture-flashcard/seal.jpg"
   },
   {
     "pictureID": "03-25",
     "pictureWord":"beluga",
     "pictureURL": "https://kids-flashcards.com/images/en/10/cards/picture-flashcard/beluga.jpg"
   },
   {
     "pictureID": "03-26",
     "pictureWord":"walrus",
     "pictureURL": "https://kids-flashcards.com/images/en/10/cards/picture-flashcard/walrus.jpg"
   }
    ]
  },
  {
    "categoryID":"04",
    "categoryName": "Insects",
    "categoryImage":"https://kids-flashcards.com/collages/insects-english-flashcards-640.jpg",
    "categoryList":[
       {
        "pictureID": "04-01",
        "pictureWord":"butterfly",
        "pictureURL": "https://kids-flashcards.com/images/en/32/cards/picture-flashcard/butterfly.jpg"
      },
      {
        "pictureID": "04-02",
        "pictureWord":"ladybug",
        "pictureURL": "https://kids-flashcards.com/images/en/32/cards/picture-flashcard/ladybug.jpg"
      },
      {
        "pictureID": "04-03",
        "pictureWord":"termite",
        "pictureURL": "https://kids-flashcards.com/images/en/32/cards/picture-flashcard/termite.jpg"
      },
      {
        "pictureID": "04-04",
        "pictureWord":"ant",
        "pictureURL": "https://kids-flashcards.com/images/en/32/cards/picture-flashcard/ant.jpg"
      },
      {
        "pictureID": "04-05",
        "pictureWord":"bug",
        "pictureURL": "https://kids-flashcards.com/images/en/32/cards/picture-flashcard/bug.jpg"
      },
      {
        "pictureID": "04-06",
        "pictureWord":"mosquito",
        "pictureURL": "https://kids-flashcards.com/images/en/32/cards/picture-flashcard/mosquito.jpg"
      },
      {
       "pictureID": "04-07",
       "pictureWord":"bedbug",
       "pictureURL": "https://kids-flashcards.com/images/en/32/cards/picture-flashcard/bedbug.jpg"
     },
     {
       "pictureID": "04-08",
       "pictureWord":"wasp",
       "pictureURL": "https://kids-flashcards.com/images/en/32/cards/picture-flashcard/wasp.jpg"
     },
     {
       "pictureID": "04-09",
       "pictureWord":"hornet",
       "pictureURL": "https://kids-flashcards.com/images/en/32/cards/picture-flashcard/hornet.jpg"
     },
     {
       "pictureID": "04-10",
       "pictureWord":"cockroach",
       "pictureURL": "https://kids-flashcards.com/images/en/32/cards/picture-flashcard/cockroach.jpg"
     },
     {
       "pictureID": "04-11",
       "pictureWord":"bumblebee",
       "pictureURL": "https://kids-flashcards.com/images/en/32/cards/picture-flashcard/bumblebee.jpg"
     },
     {
       "pictureID": "04-12",
       "pictureWord":"dragonfly",
       "pictureURL": "https://kids-flashcards.com/images/en/32/cards/picture-flashcard/dragonfly.jpg"
     },
     {
      "pictureID": "04-13",
      "pictureWord":"grasshopper",
      "pictureURL": "https://kids-flashcards.com/images/en/32/cards/picture-flashcard/grasshopper.jpg"
    },
    {
      "pictureID": "04-14",
      "pictureWord":"fly",
      "pictureURL": "https://kids-flashcards.com/images/en/32/cards/picture-flashcard/fly.jpg"
    },
    {
      "pictureID": "04-15",
      "pictureWord":"caterpillar",
      "pictureURL": "https://kids-flashcards.com/images/en/32/cards/picture-flashcard/caterpillar.jpg"
    },
    {
      "pictureID": "04-16",
      "pictureWord":"louse",
      "pictureURL": "https://kids-flashcards.com/images/en/32/cards/picture-flashcard/louse.jpg"
    },
    {
      "pictureID": "04-17",
      "pictureWord":"mantis",
      "pictureURL": "https://kids-flashcards.com/images/en/32/cards/picture-flashcard/mantis.jpg"
    },
    {
      "pictureID": "04-18",
      "pictureWord":"scarabaeus",
      "pictureURL": "https://kids-flashcards.com/images/en/32/cards/picture-flashcard/scarabaeus.jpg"
    },
    {
     "pictureID": "04-19",
     "pictureWord":"spider",
     "pictureURL": "https://kids-flashcards.com/images/en/32/cards/picture-flashcard/spider.jpg"
   },
   {
     "pictureID": "04-20",
     "pictureWord":"scorpion",
     "pictureURL": "https://kids-flashcards.com/images/en/32/cards/picture-flashcard/scorpion.jpg"
   },
   {
     "pictureID": "04-21",
     "pictureWord":"bee",
     "pictureURL": "https://kids-flashcards.com/images/en/32/cards/picture-flashcard/bee.jpg"
   },
   {
     "pictureID": "04-22",
     "pictureWord":"millipede",
     "pictureURL": "https://kids-flashcards.com/images/en/32/cards/picture-flashcard/millipede.jpg"
   },
   {
     "pictureID": "04-23",
     "pictureWord":"mite",
     "pictureURL": "https://kids-flashcards.com/images/en/32/cards/picture-flashcard/mite.jpg"
   }
    ]
  },
  {
    "categoryID":"05",
    "categoryName": "Jungle Animals",
    "categoryImage":"https://kids-flashcards.com/collages/jungle-animals-english-flashcards-640.jpg",
    "categoryList":[
       {
         "pictureID": "05-01",
         "pictureWord":"monkey",
         "pictureURL": "https://kids-flashcards.com/images/en/33/cards/picture-flashcard/monkey.jpg"
       },
       {
         "pictureID": "05-02",
         "pictureWord":"leopard",
         "pictureURL": "https://kids-flashcards.com/images/en/33/cards/picture-flashcard/leopard.jpg"
       },
       {
         "pictureID": "05-03",
         "pictureWord":"jaguar",
         "pictureURL": "https://kids-flashcards.com/images/en/33/cards/picture-flashcard/jaguar.jpg"
       },
       {
         "pictureID": "05-04",
         "pictureWord":"cheetah",
         "pictureURL": "https://kids-flashcards.com/images/en/33/cards/picture-flashcard/cheetah.jpg"
       },
       {
         "pictureID": "05-05",
         "pictureWord":"tiger",
         "pictureURL": "https://kids-flashcards.com/images/en/33/cards/picture-flashcard/tiger.jpg"
       },
       {
         "pictureID": "05-06",
         "pictureWord":"zebra",
         "pictureURL": "https://kids-flashcards.com/images/en/33/cards/picture-flashcard/zebra.jpg"
       },
       {
         "pictureID": "05-07",
         "pictureWord":"hippopotamus",
         "pictureURL": "https://kids-flashcards.com/images/en/33/cards/picture-flashcard/hippopotamus.jpg"
       },
       {
         "pictureID": "05-08",
         "pictureWord":"panda",
         "pictureURL": "https://kids-flashcards.com/images/en/33/cards/picture-flashcard/panda.jpg"
       },
       {
         "pictureID": "05-09",
         "pictureWord":"lion",
         "pictureURL": "https://kids-flashcards.com/images/en/33/cards/picture-flashcard/lion.jpg"
       },
       {
         "pictureID": "05-10",
         "pictureWord":"giraffe",
         "pictureURL": "https://kids-flashcards.com/images/en/33/cards/picture-flashcard/giraffe.jpg"
       },
       {
         "pictureID": "05-11",
         "pictureWord":"elephant",
         "pictureURL": "https://kids-flashcards.com/images/en/33/cards/picture-flashcard/elephant.jpg"
       },
       {
         "pictureID": "05-12",
         "pictureWord":"rhinoceros",
         "pictureURL": "https://kids-flashcards.com/images/en/33/cards/picture-flashcard/rhinoceros.jpg"
       },
       {
         "pictureID": "05-13",
         "pictureWord":"ocelot",
         "pictureURL": "https://kids-flashcards.com/images/en/33/cards/picture-flashcard/ocelot.jpg"
       },
       {
         "pictureID": "05-14",
         "pictureWord":"crocodile",
         "pictureURL": "https://kids-flashcards.com/images/en/33/cards/picture-flashcard/crocodile.jpg"
       },
       {
         "pictureID": "05-15",
         "pictureWord":"gorilla",
         "pictureURL": "https://kids-flashcards.com/images/en/33/cards/picture-flashcard/gorilla.jpg"
       },
       {
         "pictureID": "05-16",
         "pictureWord":"anteater",
         "pictureURL": "https://kids-flashcards.com/images/en/33/cards/picture-flashcard/anteater.jpg"
       },
       {
         "pictureID": "05-17",
         "pictureWord":"tapir",
         "pictureURL": "https://kids-flashcards.com/images/en/33/cards/picture-flashcard/tapir.jpg"
       },
       {
         "pictureID": "05-18",
         "pictureWord":"red panda",
         "pictureURL": "https://kids-flashcards.com/images/en/33/cards/picture-flashcard/red-panda.jpg"
       },
       {
         "pictureID": "05-19",
         "pictureWord":"gibbon",
         "pictureURL": "https://kids-flashcards.com/images/en/33/cards/picture-flashcard/gibbon.jpg"
       },
       {
         "pictureID": "05-20",
         "pictureWord":"white tiger",
         "pictureURL": "https://kids-flashcards.com/images/en/33/cards/picture-flashcard/white-tiger.jpg"
       },
       {
         "pictureID": "05-21",
         "pictureWord":"sifaka",
         "pictureURL": "https://kids-flashcards.com/images/en/33/cards/picture-flashcard/sifaka.jpg"
       }
    ]
  },
  {
    "categoryID":"06",
    "categoryName": "Forest Animals",
    "categoryImage":"https://kids-flashcards.com/collages/forest-animals-english-flashcards-640.jpg",
    "categoryList":[
       {
         "pictureID": "06-01",
         "pictureWord":"buffalo",
         "pictureURL": "https://kids-flashcards.com/images/en/34/cards/picture-flashcard/buffalo.jpg"
       },
       {
         "pictureID": "06-02",
         "pictureWord":"hedgehog",
         "pictureURL": "https://kids-flashcards.com/images/en/34/cards/picture-flashcard/hedgehog.jpg"
       },
       {
         "pictureID": "06-03",
         "pictureWord":"sloth",
         "pictureURL": "https://kids-flashcards.com/images/en/34/cards/picture-flashcard/sloth.jpg"
       },
       {
         "pictureID": "06-04",
         "pictureWord":"lynx",
         "pictureURL": "https://kids-flashcards.com/images/en/34/cards/picture-flashcard/lynx.jpg"
       },
       {
         "pictureID": "06-05",
         "pictureWord":"bear",
         "pictureURL": "https://kids-flashcards.com/images/en/34/cards/picture-flashcard/bear.jpg"
       },
       {
         "pictureID": "06-06",
         "pictureWord":"coyote",
         "pictureURL": "https://kids-flashcards.com/images/en/34/cards/picture-flashcard/coyote.jpg"
       },
       {
         "pictureID": "06-07",
         "pictureWord":"ferret",
         "pictureURL": "https://kids-flashcards.com/images/en/34/cards/picture-flashcard/ferret.jpg"
       },
       {
         "pictureID": "06-08",
         "pictureWord":"fox",
         "pictureURL": "https://kids-flashcards.com/images/en/34/cards/picture-flashcard/fox.jpg"
       },
       {
         "pictureID": "06-09",
         "pictureWord":"raccon",
         "pictureURL": "https://kids-flashcards.com/images/en/34/cards/picture-flashcard/raccon.jpg"
       },
       {
         "pictureID": "06-10",
         "pictureWord":"squirell",
         "pictureURL": "https://kids-flashcards.com/images/en/34/cards/picture-flashcard/squirell.jpg"
       },
       {
         "pictureID": "06-11",
         "pictureWord":"wolf",
         "pictureURL": "https://kids-flashcards.com/images/en/34/cards/picture-flashcard/wolf.jpg"
       },
       {
         "pictureID": "06-12",
         "pictureWord":"badger",
         "pictureURL": "https://kids-flashcards.com/images/en/34/cards/picture-flashcard/badger.jpg"
       },
       {
         "pictureID": "06-13",
         "pictureWord":"chipmunk",
         "pictureURL": "https://kids-flashcards.com/images/en/34/cards/picture-flashcard/chipmunk.jpg"
       },
       {
         "pictureID": "06-14",
         "pictureWord":"bison",
         "pictureURL": "https://kids-flashcards.com/images/en/34/cards/picture-flashcard/bison.jpg"
       },
       {
         "pictureID": "06-15",
         "pictureWord":"mole",
         "pictureURL": "https://kids-flashcards.com/images/en/34/cards/picture-flashcard/mole.jpg"
       },
       {
         "pictureID": "06-16",
         "pictureWord":"moose",
         "pictureURL": "https://kids-flashcards.com/images/en/34/cards/picture-flashcard/moose.jpg"
       },
       {
         "pictureID": "06-17",
         "pictureWord":"wolverine",
         "pictureURL": "https://kids-flashcards.com/images/en/34/cards/picture-flashcard/wolverine.jpg"
       },
       {
         "pictureID": "06-18",
         "pictureWord":"skunk",
         "pictureURL": "https://kids-flashcards.com/images/en/34/cards/picture-flashcard/skunk.jpg"
       },
       {
         "pictureID": "06-19",
         "pictureWord":"marmot",
         "pictureURL": "https://kids-flashcards.com/images/en/34/cards/picture-flashcard/marmot.jpg"
       },
       {
         "pictureID": "06-20",
         "pictureWord":"deer",
         "pictureURL": "https://kids-flashcards.com/images/en/34/cards/picture-flashcard/deer.jpg"
       },
       {
         "pictureID": "06-21",
         "pictureWord":"boar",
         "pictureURL": "https://kids-flashcards.com/images/en/34/cards/picture-flashcard/boar.jpg"
       },
       {
         "pictureID": "06-22",
         "pictureWord":"hare",
         "pictureURL": "https://kids-flashcards.com/images/en/34/cards/picture-flashcard/hare.jpg"
       }
    ]
  },
  {
    "categoryID":"07",
    "categoryName": "Birds",
    "categoryImage":"https://kids-flashcards.com/collages/wild-birds-english-flashcards-640.jpg",
    "categoryList":[
       {
         "pictureID": "07-01",
         "pictureWord":"ostrich",
         "pictureURL": "https://kids-flashcards.com/images/en/3/cards/picture-flashcard/ostrich.jpg"
       },
       {
         "pictureID": "07-02",
         "pictureWord":"peacock",
         "pictureURL": "https://kids-flashcards.com/images/en/3/cards/picture-flashcard/peacock.jpg"
       },
       {
         "pictureID": "07-03",
         "pictureWord":"pheasant",
         "pictureURL": "https://kids-flashcards.com/images/en/3/cards/picture-flashcard/pheasant.jpg"
       },
       {
         "pictureID": "07-04",
         "pictureWord":"hen",
         "pictureURL": "https://kids-flashcards.com/images/en/3/cards/picture-flashcard/hen.jpg"
       },
       {
         "pictureID": "07-05",
         "pictureWord":"turkey",
         "pictureURL": "https://kids-flashcards.com/images/en/3/cards/picture-flashcard/turkey.jpg"
       },
       {
         "pictureID": "07-06",
         "pictureWord":"chick",
         "pictureURL": "https://kids-flashcards.com/images/en/3/cards/picture-flashcard/chick-311667672054.jpg"
       },
       {
         "pictureID": "07-07",
         "pictureWord":"rooster",
         "pictureURL": "https://kids-flashcards.com/images/en/3/cards/picture-flashcard/rooster.jpg"
       },
       {
         "pictureID": "07-08",
         "pictureWord":"duck",
         "pictureURL": "https://kids-flashcards.com/images/en/3/cards/picture-flashcard/duck.jpg"
       },
       {
         "pictureID": "07-09",
         "pictureWord":"duckling",
         "pictureURL": "https://kids-flashcards.com/images/en/3/cards/picture-flashcard/duckling.jpg"
       },
       {
         "pictureID": "07-10",
         "pictureWord":"goose",
         "pictureURL": "https://kids-flashcards.com/images/en/3/cards/picture-flashcard/goose.jpg"
       },
       {
         "pictureID": "07-11",
         "pictureWord":"quail",
         "pictureURL": "https://kids-flashcards.com/images/en/3/cards/picture-flashcard/quail.jpg"
       },
       {
         "pictureID": "07-12",
         "pictureWord":"titmouse",
         "pictureURL": "https://kids-flashcards.com/images/en/4/cards/picture-flashcard/titmouse.jpg"
       },
       {
         "pictureID": "07-13",
         "pictureWord":"swallow",
         "pictureURL": "https://kids-flashcards.com/images/en/4/cards/picture-flashcard/swallow.jpg"
       },
       {
         "pictureID": "07-14",
         "pictureWord":"sparrow",
         "pictureURL": "https://kids-flashcards.com/images/en/4/cards/picture-flashcard/sparrow.jpg"
       },
       {
         "pictureID": "07-15",
         "pictureWord":"ciconia",
         "pictureURL": "https://kids-flashcards.com/images/en/4/cards/picture-flashcard/ciconia.jpg"
       },
       {
         "pictureID": "07-16",
         "pictureWord":"vulture",
         "pictureURL": "https://kids-flashcards.com/images/en/4/cards/picture-flashcard/vulture.jpg"
       },
       {
         "pictureID": "07-17",
         "pictureWord":"falcon",
         "pictureURL": "https://kids-flashcards.com/images/en/4/cards/picture-flashcard/falcon.jpg"
       },
       {
         "pictureID": "07-18",
         "pictureWord":"hummingbird",
         "pictureURL": "https://kids-flashcards.com/images/en/4/cards/picture-flashcard/hummingbird.jpg"
       },
       {
         "pictureID": "07-19",
         "pictureWord":"owl",
         "pictureURL": "https://kids-flashcards.com/images/en/4/cards/picture-flashcard/owl.jpg"
       },
       {
         "pictureID": "07-20",
         "pictureWord":"woodpecker",
         "pictureURL": "https://kids-flashcards.com/images/en/4/cards/picture-flashcard/woodpecker.jpg"
       },
       {
         "pictureID": "07-21",
         "pictureWord":"pelican",
         "pictureURL": "https://kids-flashcards.com/images/en/4/cards/picture-flashcard/pelican.jpg"
       },
       {
         "pictureID": "07-22",
         "pictureWord":"swan",
         "pictureURL": "https://kids-flashcards.com/images/en/4/cards/picture-flashcard/swan.jpg"
       },
       {
         "pictureID": "07-23",
         "pictureWord":"bullfinch",
         "pictureURL": "https://kids-flashcards.com/images/en/4/cards/picture-flashcard/bullfinch.jpg"
       },
       {
         "pictureID": "07-24",
         "pictureWord":"parrot",
         "pictureURL": "https://kids-flashcards.com/images/en/4/cards/picture-flashcard/parrot.jpg"
       },
       {
         "pictureID": "07-25",
         "pictureWord":"crow",
         "pictureURL": "https://kids-flashcards.com/images/en/4/cards/picture-flashcard/crow.jpg"
       },
       {
         "pictureID": "07-26",
         "pictureWord":"eagle",
         "pictureURL": "https://kids-flashcards.com/images/en/4/cards/picture-flashcard/eagle.jpg"
       },
       {
         "pictureID": "07-27",
         "pictureWord":"flamingo",
         "pictureURL": "https://kids-flashcards.com/images/en/4/cards/picture-flashcard/flamingo.jpg"
       },
       {
         "pictureID": "07-28",
         "pictureWord":"pigeon",
         "pictureURL": "https://kids-flashcards.com/images/en/4/cards/picture-flashcard/pigeon.jpg"
       },
       {
         "pictureID": "07-29",
         "pictureWord":"penguin",
         "pictureURL": "https://kids-flashcards.com/images/en/4/cards/picture-flashcard/penguin.jpg"
       }
    ]
  },
  {
    "categoryID":"08",
    "categoryName": "Fruits",
    "categoryImage":"https://kids-flashcards.com/collages/fruits-english-flashcards-640.jpg",
    "categoryList":[
       {
         "pictureID": "08-01",
         "pictureWord":"pineapple",
         "pictureURL": "https://kids-flashcards.com/images/en/8/cards/picture-flashcard/pineapple.jpg"
       },
       {
         "pictureID": "08-02",
         "pictureWord":"pomegranate",
         "pictureURL": "https://kids-flashcards.com/images/en/8/cards/picture-flashcard/pomegranate.jpg"
       },
       {
         "pictureID": "08-03",
         "pictureWord":"pear",
         "pictureURL": "https://kids-flashcards.com/images/en/8/cards/picture-flashcard/pear.jpg"
       },
       {
         "pictureID": "08-04",
         "pictureWord":"plum",
         "pictureURL": "https://kids-flashcards.com/images/en/8/cards/picture-flashcard/plum.jpg"
       },
       {
         "pictureID": "08-05",
         "pictureWord":"grape",
         "pictureURL": "https://kids-flashcards.com/images/en/8/cards/picture-flashcard/grapes.jpg"
       },
       {
         "pictureID": "08-06",
         "pictureWord":"guava",
         "pictureURL": "https://kids-flashcards.com/images/en/8/cards/picture-flashcard/guava.jpg"
       },
       {
         "pictureID": "08-07",
         "pictureWord":"banana",
         "pictureURL": "https://kids-flashcards.com/images/en/8/cards/picture-flashcard/banana.jpg"
       },
       {
         "pictureID": "08-08",
         "pictureWord":"apple",
         "pictureURL": "https://kids-flashcards.com/images/en/8/cards/picture-flashcard/apple.jpg"
       },
       {
         "pictureID": "08-09",
         "pictureWord":"apricot",
         "pictureURL": "https://kids-flashcards.com/images/en/8/cards/picture-flashcard/apricot.jpg"
       },
       {
         "pictureID": "08-10",
         "pictureWord":"avocado",
         "pictureURL": "https://kids-flashcards.com/images/en/8/cards/picture-flashcard/avocado.jpg"
       },
       {
         "pictureID": "08-11",
         "pictureWord":"coconut",
         "pictureURL": "https://kids-flashcards.com/images/en/8/cards/picture-flashcard/coconut.jpg"
       },
       {
         "pictureID": "08-12",
         "pictureWord":"dates",
         "pictureURL": "https://kids-flashcards.com/images/en/8/cards/picture-flashcard/dates.jpg"
       },
       {
         "pictureID": "08-13",
         "pictureWord":"grapefruit",
         "pictureURL": "https://kids-flashcards.com/images/en/8/cards/picture-flashcard/grapefruit.jpg"
       },
       {
         "pictureID": "08-14",
         "pictureWord":"kiwi",
         "pictureURL": "https://kids-flashcards.com/images/en/8/cards/picture-flashcard/kiwi.jpg"
       },
       {
         "pictureID": "08-15",
         "pictureWord":"lemon",
         "pictureURL": "https://kids-flashcards.com/images/en/8/cards/picture-flashcard/lemon.jpg"
       },
       {
         "pictureID": "08-16",
         "pictureWord":"lime",
         "pictureURL": "https://kids-flashcards.com/images/en/8/cards/picture-flashcard/lime.jpg"
       },
       {
         "pictureID": "08-17",
         "pictureWord":"mango",
         "pictureURL": "https://kids-flashcards.com/images/en/8/cards/picture-flashcard/mango.jpg"
       },
       {
         "pictureID": "08-18",
         "pictureWord":"orange",
         "pictureURL": "https://kids-flashcards.com/images/en/8/cards/picture-flashcard/orange.jpg"
       },
       {
         "pictureID": "08-19",
         "pictureWord":"peach",
         "pictureURL": "https://kids-flashcards.com/images/en/8/cards/picture-flashcard/peach.jpg"
       },
       {
         "pictureID": "08-20",
         "pictureWord":"persimmon",
         "pictureURL": "https://kids-flashcards.com/images/en/8/cards/picture-flashcard/persimmon.jpg"
       },
       {
         "pictureID": "08-21",
         "pictureWord":"cranberry",
         "pictureURL": "https://kids-flashcards.com/images/en/11/cards/picture-flashcard/cranberry.jpg"
       },
       {
         "pictureID": "08-22",
         "pictureWord":"gooseberry",
         "pictureURL": "https://kids-flashcards.com/images/en/11/cards/picture-flashcard/gooseberry.jpg"
       },
       {
         "pictureID": "08-23",
         "pictureWord":"melon",
         "pictureURL": "https://kids-flashcards.com/images/en/11/cards/picture-flashcard/melon.jpg"
       },
       {
         "pictureID": "08-24",
         "pictureWord":"raspberry",
         "pictureURL": "https://kids-flashcards.com/images/en/11/cards/picture-flashcard/raspberry.jpg"
       },
       {
         "pictureID": "08-25",
         "pictureWord":"strawberry",
         "pictureURL": "https://kids-flashcards.com/images/en/11/cards/picture-flashcard/strawberry.jpg"
       },
       {
         "pictureID": "08-26",
         "pictureWord":"watermelon",
         "pictureURL": "https://kids-flashcards.com/images/en/11/cards/picture-flashcard/watermelon.jpg"
       },
       {
         "pictureID": "08-27",
         "pictureWord":"cherry",
         "pictureURL": "https://kids-flashcards.com/images/en/11/cards/picture-flashcard/cherry.jpg"
       },
       {
         "pictureID": "08-28",
         "pictureWord":"blackberry",
         "pictureURL": "https://kids-flashcards.com/images/en/11/cards/picture-flashcard/blackberry.jpg"
       },
       {
         "pictureID": "08-29",
         "pictureWord":"red currant",
         "pictureURL": "https://kids-flashcards.com/images/en/11/cards/picture-flashcard/red-currant.jpg"
       },
       {
         "pictureID": "08-30",
         "pictureWord":"black currant",
         "pictureURL": "https://kids-flashcards.com/images/en/11/cards/picture-flashcard/black-currant.jpg"
       },
       {
         "pictureID": "08-31",
         "pictureWord":"blueberry",
         "pictureURL": "https://kids-flashcards.com/images/en/11/cards/picture-flashcard/blueberry.jpg"
       }
    ]
  },
  {
    "categoryID":"09",
    "categoryName": "Vegetables",
    "categoryImage":"https://kids-flashcards.com/collages/vegetables-english-flashcards-640.jpg",
    "categoryList":[
       {
         "pictureID": "09-01",
         "pictureWord":"broccoli",
         "pictureURL": "https://kids-flashcards.com/images/en/9/cards/picture-flashcard/broccoli.jpg"
       },
       {
         "pictureID": "09-02",
         "pictureWord":"carrot",
         "pictureURL": "https://kids-flashcards.com/images/en/9/cards/picture-flashcard/carrot.jpg"
       },
       {
         "pictureID": "09-03",
         "pictureWord":"corn",
         "pictureURL": "https://kids-flashcards.com/images/en/9/cards/picture-flashcard/corn.jpg"
       },
       {
         "pictureID": "09-04",
         "pictureWord":"cucumber",
         "pictureURL": "https://kids-flashcards.com/images/en/9/cards/picture-flashcard/cucumber.jpg"
       },
       {
         "pictureID": "09-05",
         "pictureWord":"eggplant",
         "pictureURL": "https://kids-flashcards.com/images/en/9/cards/picture-flashcard/eggplant.jpg"
       },
       {
         "pictureID": "09-06",
         "pictureWord":"garlic",
         "pictureURL": "https://kids-flashcards.com/images/en/9/cards/picture-flashcard/garlic.jpg"
       },
       {
         "pictureID": "09-07",
         "pictureWord":"ginger",
         "pictureURL": "https://kids-flashcards.com/images/en/9/cards/picture-flashcard/ginger.jpg"
       },
       {
         "pictureID": "09-08",
         "pictureWord":"olives",
         "pictureURL": "https://kids-flashcards.com/images/en/9/cards/picture-flashcard/olives.jpg"
       },
       {
         "pictureID": "09-09",
         "pictureWord":"onion",
         "pictureURL": "https://kids-flashcards.com/images/en/9/cards/picture-flashcard/onion.jpg"
       },
       {
         "pictureID": "09-10",
         "pictureWord":"pepper",
         "pictureURL": "https://kids-flashcards.com/images/en/9/cards/picture-flashcard/pepper.jpg"
       },
       {
         "pictureID": "09-11",
         "pictureWord":"potato",
         "pictureURL": "https://kids-flashcards.com/images/en/9/cards/picture-flashcard/potato.jpg"
       },
       {
         "pictureID": "09-12",
         "pictureWord":"pumpkin",
         "pictureURL": "https://kids-flashcards.com/images/en/9/cards/picture-flashcard/pumpkin.jpg"
       },
       {
         "pictureID": "09-13",
         "pictureWord":"spinach",
         "pictureURL": "https://kids-flashcards.com/images/en/9/cards/picture-flashcard/spinach.jpg"
       },
       {
         "pictureID": "09-14",
         "pictureWord":"lettuce",
         "pictureURL": "https://kids-flashcards.com/images/en/9/cards/picture-flashcard/salad.jpg"
       },
       {
         "pictureID": "09-15",
         "pictureWord":"tomato",
         "pictureURL": "https://kids-flashcards.com/images/en/9/cards/picture-flashcard/tomato.jpg"
       },
       {
         "pictureID": "09-16",
         "pictureWord":"pea",
         "pictureURL": "https://kids-flashcards.com/images/en/9/cards/picture-flashcard/garden-pea.jpg"
       },
       {
         "pictureID": "09-17",
         "pictureWord":"custard squash",
         "pictureURL": "https://kids-flashcards.com/images/en/9/cards/picture-flashcard/custard-squash.jpg"
       },
       {
         "pictureID": "09-18",
         "pictureWord":"radish",
         "pictureURL": "https://kids-flashcards.com/images/en/9/cards/picture-flashcard/radish.jpg"
       },
       {
         "pictureID": "09-19",
         "pictureWord":"turnip",
         "pictureURL": "https://kids-flashcards.com/images/en/9/cards/picture-flashcard/turnip.jpg"
       },
       {
         "pictureID": "09-20",
         "pictureWord":"beet",
         "pictureURL": "https://kids-flashcards.com/images/en/9/cards/picture-flashcard/beet.jpg"
       },
       {
         "pictureID": "09-21",
         "pictureWord":"celery",
         "pictureURL": "https://kids-flashcards.com/images/en/9/cards/picture-flashcard/celery.jpg"
       },
       {
         "pictureID": "09-22",
         "pictureWord":"cauliflower",
         "pictureURL": "https://kids-flashcards.com/images/en/9/cards/picture-flashcard/cauliflower.jpg"
       },
       {
         "pictureID": "09-23",
         "pictureWord":"zucchini",
         "pictureURL": "https://kids-flashcards.com/images/en/9/cards/picture-flashcard/zucchini.jpg"
       },
       {
         "pictureID": "09-24",
         "pictureWord":"chili pepper",
         "pictureURL": "https://kids-flashcards.com/images/en/9/cards/picture-flashcard/chili-pepper.jpg"
       },
       {
         "pictureID": "09-25",
         "pictureWord":"white cabbage",
         "pictureURL": "https://kids-flashcards.com/images/en/9/cards/picture-flashcard/white-cabbage.jpg"
       },
       {
         "pictureID": "09-26",
         "pictureWord":"red cabbage",
         "pictureURL": "https://kids-flashcards.com/images/en/9/cards/picture-flashcard/red-cabbage.jpg"
       },
       {
         "pictureID": "09-27",
         "pictureWord":"savoy cabbage",
         "pictureURL": "https://kids-flashcards.com/images/en/9/cards/picture-flashcard/savoy-cabbage.jpg"
       },
       {
         "pictureID": "09-29",
         "pictureWord":"romanesco broccoli",
         "pictureURL": "https://kids-flashcards.com/images/en/9/cards/picture-flashcard/romanesco-broccoli.jpg"
       }
    ]
  },
  {
    "categoryID":"10",
    "categoryName": "Colors",
    "categoryImage":"https://kids-flashcards.com/collages/base-colors-english-flashcards-640.jpg",
    "categoryList":[
       {
         "pictureID": "10-01",
         "pictureWord":"blue",
         "pictureURL": "https://kids-flashcards.com/images/en/30/cards/picture-flashcard/blue.jpg"
       },
       {
         "pictureID": "10-02",
         "pictureWord":"gold",
         "pictureURL": "https://kids-flashcards.com/images/en/30/cards/picture-flashcard/gold.jpg"
       },
       {
         "pictureID": "10-03",
         "pictureWord":"black",
         "pictureURL": "https://kids-flashcards.com/images/en/30/cards/picture-flashcard/black.jpg"
       },
       {
         "pictureID": "10-04",
         "pictureWord":"red",
         "pictureURL": "https://kids-flashcards.com/images/en/30/cards/picture-flashcard/red.jpg"
       },
       {
         "pictureID": "10-05",
         "pictureWord":"brown",
         "pictureURL": "https://kids-flashcards.com/images/en/30/cards/picture-flashcard/brown.jpg"
       },
       {
         "pictureID": "10-06",
         "pictureWord":"gray",
         "pictureURL": "https://kids-flashcards.com/images/en/30/cards/picture-flashcard/gray.jpg"
       },
       {
         "pictureID": "10-07",
         "pictureWord":"green",
         "pictureURL": "https://kids-flashcards.com/images/en/30/cards/picture-flashcard/green.jpg"
       },
       {
         "pictureID": "10-08",
         "pictureWord":"orange",
         "pictureURL": "https://kids-flashcards.com/images/en/30/cards/picture-flashcard/orange.jpg"
       },
       {
         "pictureID": "10-09",
         "pictureWord":"silver",
         "pictureURL": "https://kids-flashcards.com/images/en/30/cards/picture-flashcard/silver.jpg"
       },
       {
         "pictureID": "10-10",
         "pictureWord":"purple",
         "pictureURL": "https://kids-flashcards.com/images/en/30/cards/picture-flashcard/violet.jpg"
       },
       {
         "pictureID": "10-11",
         "pictureWord":"yellow",
         "pictureURL": "https://kids-flashcards.com/images/en/30/cards/picture-flashcard/yellow.jpg"
       },
       {
         "pictureID": "10-12",
         "pictureWord":"white",
         "pictureURL": "https://kids-flashcards.com/images/en/30/cards/picture-flashcard/white.jpg"
       }
    ]
  }
  ]"""

json_object = json.loads(data)
for category in json_object:
    print(category["categoryName"])
    cat_image = category["categoryImage"]
    filename = cat_image.replace("https://kids-flashcards.com/images/en/", "/tmp/")
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    urllib.request.urlretrieve(cat_image, cat_image.replace("https://kids-flashcards.com/images/en/", "/tmp/"))
    with open(filename, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        ext = filename.split('.')[-1]
        dataurl = f'data:image/{ext};base64,{encoded_string}'
        category["categoryImage"] = dataurl
    for word in category["categoryList"]:
        print("  - " + word["pictureWord"])
        word_image = word["pictureURL"]
        filename = word_image.replace("https://kids-flashcards.com/images/en/", "/tmp/")
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        urllib.request.urlretrieve(word_image, word_image.replace("https://kids-flashcards.com/images/en/", "/tmp/"))
        with open(filename, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
            ext = filename.split('.')[-1]
            dataurl = f'data:image/{ext};base64,{encoded_string}'
            word["pictureURL"] = dataurl

with open('constants/data.json', 'w') as out_file:
     json.dump(json_object, out_file, sort_keys = True, indent = 4,
               ensure_ascii = False)

with open("./assets/cat_profile.png", "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    ext = "png"
    dataurl = f'data:image/{ext};base64,{encoded_string}'
    print(dataurl)
print("Done!")