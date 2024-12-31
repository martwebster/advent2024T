export interface Track {
   cells: Cell[][],
   start: Pos,
   end: Pos,
   baseline?: string[]
}

export interface Cell {
   content: string,
   stepsLeft?: number,
}

export interface Route {
   pos: Pos,
   steps: number,
   visited: string[]
}

export const createTrack = (data: string[]): Track => {
   const cells: Cell[][] = []

   for (let y = 0; y < data.length; y++) {
      const row: Cell[] = []
      for (let x = 0; x < data[y].length; x++) {
         row.push({
            content: data[y].charAt(x)
         })
      }
      cells.push(row)
   }

   return {
      cells,
      start: cells.scan(it => it.content == "S")[0],
      end: cells.scan(it => it.content == "E")[0]
   }
}

export const getCell = (track: Track, pos: Pos): Cell => {
   return track.cells[pos.y][pos.x]
}

export const canVisit = (track: Track, route: Route): boolean => {
   const { pos } = route
   if (route.visited.includes(pos.x + ":" + pos.y)) {
      return false
   }
   if (pos.x == 0 || pos.y == 0) {
      return false
   }
   const cell = getCell(track, pos)
   return cell.content == "." || cell.content == "E"
}

export const moveCell = (track: Track, route: Route, result: Route[]) => {
   if (canVisit(track, route)) {
      route.visited.push(route.pos.x + ":" + route.pos.y)
      result.push(route)
   }
}

export const moveRoute = (track: Track, route: Route): Route[] => {
   const next: Route[] = []

   const up: Route = {
      steps: route.steps + 1,
      visited: [...route.visited],
      pos: {
         x: route.pos.x,
         y: route.pos.y - 1
      }
   }
   moveCell(track, up, next)

   const down: Route = {
      steps: route.steps + 1,
      visited: [...route.visited],
      pos: {
         x: route.pos.x,
         y: route.pos.y + 1
      }
   }
   moveCell(track, down, next)

   const left: Route = {
      steps: route.steps + 1,
      visited: [...route.visited],
      pos: {
         x: route.pos.x - 1,
         y: route.pos.y
      }
   }
   moveCell(track, left, next)

   const right: Route = {
      steps: route.steps + 1,
      visited: [...route.visited],
      pos: {
         x: route.pos.x + 1,
         y: route.pos.y
      }
   }
   moveCell(track, right, next)
   return next
}

export const calculateBaseline = (track: Track): Route => {
   const startRoute: Route = {
      pos: track.start,
      steps: 0,
      visited: [track.start.x + ":" + track.start.y]
   }
   let routes = [startRoute]
   var finisher: Route | undefined
   while (finisher== undefined) {
      routes = routes.flatMap(route => moveRoute(track, route))
      finisher = routes.find(it => it.pos.x == track.end.x && it.pos.y == track.end.y)
   }
   return finisher
}

export const recordBaseline = (track: Track, baseline: string[]) => {
   let stepsLeft = baseline.length - 1
   for (const posString of baseline) {
      const pos = {
         x: Number(posString.substringBefore(":")),
         y: Number(posString.substringAfter(":"))
      }
      const cell = getCell(track, pos)
      cell.stepsLeft = stepsLeft
      stepsLeft--
   }
   track.baseline = baseline
   displayTrack(track)
}

export const displayTrack = (track: Track) => {
   const displayRow = (row: Cell[]): string => {
      return row.map(cell => {
         if (cell.content == ".") {
            if (cell.stepsLeft != undefined) {
               return "-"
            } else {
               return "."
            }
         }
         return cell.content
      }).join("")
   }
   track.cells.forEach(it => console.log(displayRow(it)))
}

// Part 2
// This could be harvested onto Pos
export const getAvailablePositions = (pos: Pos, maxX: number,
                                      maxY: number,
                                      steps: number): Pos[] => {
   const yTop = pos.y - steps

   let xLeft = pos.x
   let xRight = pos.x

   let result: Pos[] = []
   for (let y = yTop; y <= pos.y; y++) {
      for (let x = xLeft; x <= xRight; x++) {
         // from the top
         result.push({
            x,
            y
         })
         // from the bottom
         if (y != pos.y) {
            result.push({
               x,
               y: pos.y + (pos.y - y)
            })
         }
      }
      xLeft--
      xRight++
   }

   result = result.filter(pos => pos.y > -1 && pos.x > -1)
   result = result.filter(pos => pos.y <= maxY && pos.x <= maxX)

   return result
}

export const getCheats = (track: Track,
                          seconds: number,
                          minSavings: number): number[] => {
   const results: number[] = []
   for (const posStr of track.baseline!) {
      const pos = {
         x: Number(posStr.substringBefore(":")),
         y: Number(posStr.substringAfter(":"))
      }

      const currentCell = getCell(track, pos)
      const positions = getAvailablePositions(pos, track.cells[0].length - 1, track.cells.length - 1, seconds)

      positions.map(next => {
         const nextCell = getCell(track, next)
         if (nextCell.stepsLeft != undefined) {
            const distance = Math.abs(next.x - pos.x) + Math.abs(next.y - pos.y)
            return (currentCell.stepsLeft! - nextCell.stepsLeft!) - distance
         }
         return -1
      }).filter(saving => saving >= minSavings)
         .forEach(saving => results.push(saving))
   }
   console.log(groupByCount(results))
   return results
}

// This could be harvested.
const groupByCount = (numbers: number[]): Map<number, number> =>{
   const groups = new Map<number, number>()
   for (const val of numbers) {
      const current = groups.get(val)
      if (current == undefined) {
         groups.set(val, 1)
      } else {
         groups.set(val, current + 1)
      }
   }
   return groups.sort((a, b) => a[0] - b[0])
}