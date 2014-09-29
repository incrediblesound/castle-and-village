Castle and Village
==================

Castle and Village is a text-based object-oriented single-page multi-hyphen fantasy strategy game. Other than feeding my desire to make fantasy games, this project is an experiment to see what can be done with OOP and event systems. If I get around to it I might try removing jQuery and make it entirely native JS.

Game Structure
--------------
CaV is organized into a system of unit and controller objects, all of which are stored in a global object.
```javascript
window.gameState.units //=> castle, barracks, village, domain
window.gameState.controllers //=> actionController, milestoneController, gameController, disasterController
```
The units define the game world, the player progress within the game world, and the conditions for success or failure. Controllers are objects that control the main aspects of gameplay. Units and controllers are discussed in detail below.

Units and controllers both have a step function which defines what they do each turn; the disasterController randomly generates disasters, the milestoneController checks for milestones achieved etc. The main function of the game controller is to call the step function of each object every turn. 

Game Objects
============
The following is an explanation of the role of each object in the game system. Please be aware that the javascript which follows is used to provide explanation and is not reflective of actual code in the game.

Units
-----

<strong>Castle</strong>
```javascript
Castle.properties = {
	money: "Money is required to makes purchases and to do actions. Running out of money means the player has to collect taxes, which is bad for the peasants.",
	wizards: "At a high level the player can attract wizards to bolster their army.",
	level: "Certain milestones allow the player to level up, opening up new actions, purchases and disasters.",
	masters: "Masters are required to pass milestones and provide other benefits.",
	buildings: "Buildings have the same role as masters but they are buildings."
	food: "Food is consumed by knights, "
}
Castle.methods = {
	/*
	Both the castle and the village have a set of methods including hasMaster, addMaster, hasBuilding and addBuilding which are self explanatory helper-functions. They will not be discussed here.
	*/
}

```
<strong>Village</strong>
```javascript
village.properties = {

}
village.methods = {
	Village.prototype.hasMaster() // check if the village has a certain master
	Village.prototype.hasBuilding() // check if the village has a certain building
	Village.prototype.addMaster() // adds a master to the village
	Village.prototype.addBuilding() // adds a building to the village
	Village.prototype.step() //

}
```