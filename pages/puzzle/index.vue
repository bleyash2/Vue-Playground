<template>
  <div>
    <NuxtLink to="/">Go Back</NuxtLink>
    <div class="puzzleWrapper">
      <div class="puzzle">
        <div
          class="puzzleTile"
          v-for="(tile, index) in puzzleState"
          :key="tile"
        >
          <div v-if="tile === 0" class="emptySpace"></div>
          <div
            v-else-if="moveableValues.includes(tile)"
            class="moveable"
            v-on:click="moveTile(index)"
          >
            {{ tile }}
          </div>
          <div v-else class="">{{ tile }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { initialisePuzzle, getMoveableValues } from './puzzleHelperFn'

const initalState = {
  puzzle: initialisePuzzle(),
}

export default {
  data() {
    return {
      puzzleState: initalState.puzzle,
      emptySpaceIndex: initalState.puzzle.findIndex((value) => value == 0),
      moveableValues: getMoveableValues(initalState.puzzle),
    }
  },
  methods: {
    moveTile: function (indexToMove) {
      let newPuzzleState = [...this.puzzleState]
      newPuzzleState[this.emptySpaceIndex] = this.puzzleState[indexToMove]
      newPuzzleState[indexToMove] = 0
      this.updatePuzzleState(newPuzzleState)
    },

    updatePuzzleState: function updatePuzzleState(newPuzzleState) {
      this.puzzleState = newPuzzleState
      this.emptySpaceIndex = newPuzzleState.findIndex((value) => value == 0)
      this.moveableValues = getMoveableValues(newPuzzleState)
    },
  },
}
</script>

<style>
.puzzleWrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.puzzle {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 2.5px dashed #4bb543;
  margin: 2.5rem;
  height: 100%;
}

.puzzleTile {
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  width: calc(100% / 3);
  height: calc(100% / 3);
}

.moveable {
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background-color: #4bb543;
  height: 100%;
  width: 100%;
}

.moveable:hover {
  cursor: pointer;
  background-color: #265d22;
}

.emptySpace {
  box-shadow: inset 0px 3px 6px rgba(0, 0, 0, 0.16);
  background-color: rgba(0, 0, 0, 0.16);
  height: 100%;
  width: 100%;
}
</style>
