export interface Node {
    id: string;
    links : Node[]
}

export const findOrAdd = (nodes: Node[], id: string): Node =>{
    var node = nodes.find (it => it.id == id)
    if (node == undefined){
        node = {
            id: id,
            links: []
        }
        nodes.push(node)
    }
    return node
}

export const populateNodes= ( data: string[]): Node[] =>{
    const nodes : Node[] = []
    data.forEach (it => {
        const node1 = findOrAdd(nodes, it.substringBefore("-"));
        const node2 = findOrAdd(nodes, it.substringAfter("-"));
        
        node1.links.push(node2)
        node2.links.push(node1)
    })   
    return nodes
}

/**
 * Count the number of nodes that have formed parties of 3.
 * @param nodes 
 * @returns count
 */
export const getPart1 = (nodes: Node[]) : number => {
    var links : Array<Set<string>> = []
    var ts = nodes.filter( it => it.id.startsWith("t"))
    ts.forEach (node =>{
        node.links.forEach (level1 => {
            level1.links.forEach (level2 =>{
                if (level2.links.some (level3 => level3.id == node.id)){
                    const duplicate = links.find (it => it.has(node.id) && it.has(level1.id) && it.has(level2.id))
                    if (duplicate == undefined){
                        links.push (new Set( [node.id, level1.id, level2.id] ))
                    }
                }
            })
        })
    })
    return links.length;
}

// part 2
export const getPassword = (nodes: Node[]) : string =>{
    var parties : string[][] = []

    // pass 1, form parties
    nodes.forEach (node =>{
        var joined = false;

        // see if you can join an existing party (only if know everyone!. What a clique)
        for (const party of parties) {
            // scan the room, see if youi know anyone.. i.e no stragers.
            var strangers = party.some (guest => !node.links.map(it => it.id).includes(guest))
            if (!strangers){ // if there are no strangers, join the party.
                joined = true;
                party.push(node.id)
                break;
            }
        }
        // if you didn't find a party to join, start a new one. Saddo!. Make friends.
        if (!joined){
            parties.push( [node.id])
        }
    })

    // see if someone joined a party too early. 
    for (let partyId = 0; partyId < parties.length; partyId++) {
        const currentParty = parties[partyId];
        for (let guestId = currentParty.length-1; guestId >=0 ; guestId--) {
            const guest = currentParty[guestId];
            const nextParty = findACoolParty(nodes, guest, parties.slice(partyId+1))
            if (nextParty!= undefined){
                nextParty.push(guest)
                currentParty.removeAtIndex(guestId)
            }
        }
    }
    parties.sort ( (a,b) => b.length - a.length)
    var result = parties[0].sort();

    return result.join(",");
}

/**
 * You've started a party, but there is another party... elsewhere, 
 * and you are stuck talking to someone about your favourite stretcher of the motorway.
 * This function looks to see if there is another party you can gatecrash
 * @param nodes 
 * @param guest 
 * @param otherParties 
 * @returns a cool party to join
 */
const findACoolParty = (nodes: Node[],guest: string, otherParties: string[][]): string[]| undefined =>{
    var guestNodeLinks = nodes.find (it => it.id == guest)?.links.map (it => it.id)
    for (const party of otherParties) {
        const strangers = party.some (it => !guestNodeLinks?.includes(it))
        if (!strangers){
            return party // we know everyone in this party, usallly the kitchen
        }
    }
    return undefined
}
