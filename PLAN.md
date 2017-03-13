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
GAME
- Add Game timer
ROLL
- [OK] Roll voice commands
- [OK] Dice roll
- [OK] TT dice are locked
- [OK] Dice can be saved
- [OK] Dice can be unsaved
- [OK] If no slots available to lock TT, place regular saved die back to tray.
- If 5 TT dice are locked, place the player back to the starting room.
- [OK] Add dice roll, die save, die return sfx
MAP
- Create Map randomizer (getRoom())
ACTIONS
- Find Room
    [OK] + check if door is allowed
    [OK] + check if dice is available in tray or safeSlots;
    [OK] + show room (attach it to map);
    [OK] + move used dice to tray and chance face to 'reroll';
    [OK] + play door sfx;
- Move
    + check if direction is allowed;
    [OK] + check if dice is available in tray or safeSlots;
    [OK] + move character;
    [OK] + update currentRoom;
    [OK] + move used dice to tray and chance face to 'reroll';
    [OK] + play steps sfx;
- Say Bye
    [OK] + check if bye is allowed;
    [OK] + check if dice is available in tray or safeSlots;
    [OK] + show 'bye' balloon speech;
    [OK] + move used dice to tray and chance face to 'reroll';
    [OK] + play bye sfx;
- Show Exit;
    [OK] + check if all friends were said bye
    [OK] + show/attach sfx
