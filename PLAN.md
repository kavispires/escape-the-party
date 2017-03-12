# SET-UP

- Place Starting room
- Place Player
- Place 5 dice on Boot face in the 'tray area'.
- Shuffle the 10 rooms in the roomsArray
- Add the exit to roomsArray

## Rooms
- Starting: 2 horizontal doors
- 2LR: 2 doors, left-right
- 2LT: 2 doors, left-top
- 1B: 1 door, bottom
- 3LTR: 3 doors, left-top-right


## Levels

Level 1:
- 5 rooms (EL, S, 2LR, 2LT, 1B*)
- 1 friend

Level 2: 
- 6 rooms (EL, S, 3LTR, 1B*, 2LB, 1T*)
- 2 friends

Level 3: 
- 7 rooms (EB, 2TR, S, 3LTR, 1T, 2)
- 2 friends

# TO-DO
ROLL
- Roll voice commands [OK]
- Dice roll [OK]
- TT dice are locked [OK]
- Dice can be saved [OK]
- Dice can be unsaved [OK]
- If no slots available to lock TT, place regular saved die back to tray. [OK]
- If 5 TT dice are locked, place the player back to the starting room.
MAP
- Create 4 level-1 maps
ACTIONS
- Move
    + check if direction is allowed;
    + check if dice is available in tray or safeSlots; 
    + move character;
    + update currentRoom;
    + move used dice to tray and chance face to 'reroll';
    + play steps sound;
- Find Room
    + check if door is allowed
    + check if dice is available in tray or safeSlots;
    + show room (attach it to map);
    + move used dice to tray and chance face to 'reroll';
    + play door sound;
- Say Bye
    + check if bye is allowed;
    + check if dice is available in tray or safeSlots;
    + show 'bye' balloon speech;
    + move used dice to tray and chance face to 'reroll';
    + play bye sound;
- Show Exit;
    + check if all friends were said bye
    + show/attach exit
