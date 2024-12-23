export class Node {
    id: string;
    links : Node[] = []
    constructor(id: string){
        this.id = id;
    }
}

export const linkNodes= ( data: string[]): Node[] =>{
    const nodes : Node[] = []
    data.forEach (it => {
        const id1 = it.substringBefore("-")
        var node1 = nodes.find (it => it.id == id1)
        if (node1 == undefined){
            node1 = new Node(id1);
            nodes.push(node1)
        }

        const id2 = it.substringAfter("-")
        var node2 = nodes.find (it => it.id == id2)
        if (node2 == undefined){
            node2 = new Node(id2);
            nodes.push(node2)
        }

        node1.links.push(node2)
        node2.links.push(node1)
    })   
    return nodes
}

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

        parties.forEach (party =>{
            if (!joined){
                var notLinked = party.some (guest => !node.links.map(it => it.id).includes(guest))
                if (!notLinked){
                    joined = true;
                    party.push(node.id)
                }
            }
        })

        // if not joined, add to new party
        if (!joined){
            parties.push( [node.id])
        }
    })

    // see if someone joined a party too early. 
    for (let partyId = 0; partyId < parties.length; partyId++) {
        const currentParty = parties[partyId];
        for (let guestId = currentParty.length-1; guestId >=0 ; guestId--) {
            const guest = currentParty[guestId];
            const nextParty = getNextParty(nodes, guest, parties.slice(partyId+1))
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

const getNextParty = (nodes: Node[],guest: string, parties: string[][]): string[]| undefined =>{
    var guestNodeLinks = nodes.find (it => it.id == guest)?.links.map (it => it.id)
    var foundParty : string[]| undefined;
    parties.forEach (party =>{
        if(!foundParty){
            const ps = party.find (it => !guestNodeLinks?.includes(it))
            if (ps == undefined){
                foundParty = party
            }

        }
    })
    return foundParty
}
