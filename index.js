const R = require('ramda')
const assert = require('assert')

const tracks = `Charged Up	SKEW	9A
Within The Palms Of God	Ekcle	7A
It Ain't Bangin'	dope	4A
Warrior	EPROM & G Jones	4A
Samurai	EPROM	4A
Brixton	EPROM	4A
9 To Ya Dome	EPROM	12A
Holly & Mr. Bill - Geen Idee	Holly	9A
Read	Inspected	9A
Once	Inspected	9A
Then	Inspected	9A
Destroy	Inspected	11A
Tōsuto	Kursa	4A
Dat Style	Kursa	4A
Hip-Hopeless	Kursa	4A
Unarmoured Sulk	Kursa X Lone Drum	4A
Yea, OK	Kursa	12A
Mark Instinct - Singularity	Mark Instinct	9A
Bad Replica	SKEW & occupé	5A
No Hype	Skew & ReDraft	4A
Charged Up	SKEW	9A
Don Robot	SKEW	5A
Cyborg Rising	SKEW	1A
Acid Meltdown	SKEW	2A
Step By Step (Fytch Remix)	Droeloe	10A
Like Us (Original Mix)	Mo Vibez	10A
Crafted In Ice	Ekcle	10A
Exhale feat. Fytch (Original Mix)	Fytch, Graves	11A
Gravediggin' feat. Alix Perez and Eprom (Original Mix)	Shades	11A
Goliath (Original Mix)	Aleph	11A
I'll Be Fine (Zes Remix)	Sofie Letitre	11A
Creepin' (Original Mix)	Shades	11A
Sharp Teeth (Original Mix)	Monty	11A
Illusions	yunis	11A
Zwendel feat. Ordure (Original Mix)	Signal, Disprove, Ordure	12A
Gamma Ray (feat. Vorso) (Original Mix)	Run Dmt, Vorso	12A
Morze (Original Mix)	Kije	12A
Tesseract (Vorso Remix)	Run Dmt	1A
Pedigrief (Original Mix)	Chee	1A
Effwatya (Ft.Third Degree)	Mystic State	2A
In Your Head (Original Mix)	G Jones	2A
Polymorph (Original Mix)	Signs	2A
Wisdom (Feat. L*o*J) feat. L*o*J (Original Mix)	Mo Vibez, L.o.J, L*o*J	2A
Way Back (Original Mix)	Balatron	2B
Poseidon (Original Mix)	Balatron	2B
Whole Half	Mystic State	2B
HUGINN (Original Mix)	Balatron	2B
Drones	Cesco	4A
Attrakt (Original Mix)	Mr.Frenkie	4A
Naegleria (Original Mix)	Signs	4A
Crunchy (Original Mix)	Enei	4A
Solomon (Original Mix)	Aleph	4A
Vatos	Shield	4A
Clicc (Original Mix)	Crimes!	4A
Third Time Lucky	Thelem	4A
DJ Ride - Pump My	V. A.	4A
D.Y.E Pop (Original Mix)	Balatron	4A
Skin Out (Original Mix)	Signs	4A
Louder feat. DJ Craze (Original Mix)	DJ Craze, Icicle, Teddy Killerz	4A
Jounce (Ivy Lab's 20/20 Remix)	Emperor	4A
Magikess (Original Mix)	Ivy Lab	4A
Hologram (Original Mix)	Vue	4A
Get Hot ft. Noclu (G Jones Remix)	Chee	4A
Precisely	Kursa	4A
Vorso - Cephalopod	V. A.	4A
Prasak (Original Mix)	Woolymammoth	4A
Realson (Original Mix)	Crimes!	4A
Kicking Wolf	Tsuruda	4A
Ringshifter (Culprate Remix)	Mefjus	4A
Blowfish	Culprate & Skope	4A
Ivy Lab - Jinxed	Ivy Lab	4A
Inside (Original Mix)	Break, SpectraSoul	4A
Uminari	ARKTKT	5A
DR777 (Original Mix)	Creepa, Mo Vibez	5A
Tesseract	ARKTKT	5A
Zoo (Ft.Jakaboski)	Mystic State	5A
Dank Drip	Shield	5A
Shady (Original Mix)	Ak:Hash	6A
Flip Your Hands (Original Mix)	Balatron	6A
Word Up (feat. Balatron) (Original Mix)	Craze, Balatron	6A
Viking Journey	Shield	6A
MUNINN (Original Mix)	Balatron	6A
Slice & Dice	Herzeloyde	7A
Within The Palms Of A God	Ekcle	7A
Skew & yunis - Trippin	V. A.	7A
Dies Irae (Signal Remix)	Signal, Apashe, Black Prez	7A
Hotel Motel (Original Mix)	Ivy Lab	7A
Despair (Ak:Hash Remix)	Ewol	7A
Slavik	Shield	8A
Moonstone	Ekcle	8A
Iron Sharpens Iron (Original Mix)	Shades	8A
Stoner (Original Mix)	Ak:Hash	8A
Chicago	Shield	8A
Dracula	Shield	8A
Horrormovie (Shuffle Edit)	Shield	8A
Bowling Frontier	Shield	9A
Inverted Bumps ft Hapa & Tsuruda	Herzeloyde	9A
Modulation	Mo Vibez	9A
1-800-BAD-TRIP - Turtle Soup	V. A.	9A
Chiron (Remix)	Shades	9A
Caution (Original Mix)	Phazz	9A
Home Alone	Shield	9A
Horrormovie (Dirty VIP)	Shield	9A
Once Again (Original Mix)	Kije	9A
Sleaze (Original Mix)	Shades, Ivy Lab	9A
FXXXUp (Original Mix)	Crimes!	9A
Yoga (Original Mix)	Sabre	9A
Humans are Stupid (feat. Shield) (Original Mix)	Craze, Shield	9A
Dimes	Jon Casey	9A
Robovox (Original Mix)	Mad Zach	9B
Wildlife (CVPELLV remix)	JUNE MILLER/TEDDY KILLERZ	9A
Rise	Monuman	2A
Possession	Noisia/Ivy Lab	7A
Fools	SHIELD	4A
March Of Giants	Shield & Submarine	4A
Clap Yah	Signs	4A
The Nomad	Noisia, Mono & Poly	5A
Chiron	PEREZ, Alix/EPROM	9A
Cake (Shades Remix)	Ivy Lab	2A
Sickle (Original Mix)	Shades	6A
Hideous (Doctrine Remix)	Black Sun Empire, Noisia	6A
My Flava	SHIELD	6A
Likkle Som	RICHIE BRAINS	8A
Berlusconi	IVY LAB	8A
Recombine	Bleep Bloop	9A
U Smart	Ivy Lab & Tim Parker	9A
Grab The Cookie	Posij	9A
Roll Up (Baauer Remix)	Flosstradamus	4A
Foreword (Original Mix)	Emperor	2B
Unchained	Signs	4A
SacrilÃ¨ge (Original Mix)	Signs	4A
French Slang (Original Mix)	Signs, Sotilas	4A
4A - 170 - Shield - Horrormovie (Full)		4A
Riot Shield	Levela	4A
Domestic Problems	Shield	6A
Hollywood Swing	Shield	6A
Holly vs. Shield - Schizo	Holly	4A
Holly vs. Shield - Schizo (Subp Yao Remix)	Holly	9A
Dumflad (Original Mix)	Shield, Ordure	4A
4A or 5A - 175 - Shield_-_Be_F		4A
Pink Soap	Shield & 2Stars	5A
Skippy Vinyl (Original Mix)	Shield	5A
6A - 174 - Shield - Nightlife (CART FREEBIE)		6A
6A - 176 - Shield - I Like That (CART FREEBIE) v2		6A
Goofy (Original Mix)	Shield	7A
Copenhagen (Original Mix)	Shield	9A
Powers of Two feat. Alix Perez and Eprom (Original Mix)	Shades	6B
Calculate (Original Mix)	Ivy Lab	10A
Sasquatch (Original Mix)	Monuman	4A
Pipe Dream (Original Mix)	Eprom	5A
Humanoid 2.0 (Original Mix)	Eprom, ZEKE BEATS	4A
Zero Caliber (Original Mix)	Balatron	11A
Straight Thuggin (Original Mix)	Balatron	4A
Neck Snapper (Original Mix)	Balatron	4A
Assembler (Original Mix)	Mefjus	7A
Ubane	IVY LAB	9A
Planebeats	IVY LAB	4A
Sunday Crunk (Mefjus Remix)	Ivy Lab	8A
Third World Cop	IVY LAB	2A
Pepper (Deft Remix)	Emperor, Ivy Lab	4A
Shamrock V.I.P (Original Mix)	Ivy Lab	9A
Stars (Original Mix)	Ivy Lab	9A
All Day Swimming (Original Mix)	Ivy Lab	7A
Orange (Original Mix)	Two Fingers, Ivy Lab	6A
Hotline (Original Mix)	Two Fingers, Ivy Lab	6A
"Hotline"	Ivy Lab x Two Fingers	6A
Ivy Lab - Space War 169 (Instrumental)	Ivy Lab	4A
Ivy Lab feat. Onoe Caponoe & L-Zee Roselli - Space War 169	Ivy Lab	4A
Spooky Dub (Original Mix)	Ivy Lab	4A
Chic (Original Mix)	Ivy Lab	4A
650 CC (Original Mix)	Ivy Lab	4A
Ivy Lab - Wideboi	Ivy Lab	1B
Ivy Lab - Zip It	Ivy Lab	11A
When I Go (Original Mix)	Ivy Lab	10A
Hammer (Original Mix)	Tsuruda	9A
Jokes (Original Mix)	Tsuruda	9A
Out Here (Original Mix)	Tsuruda	2A
Pack Heat (Original Mix)	Tsuruda	12A
Cousin Litt's Revenge (Original Mix)	Tsuruda	11A
raider (Original Mix)	Tsuruda	9A
Tremors (Original Mix)	Bleep Bloop, Tsuruda	4A
Warped Wing (Original Mix)	Tim Parker	6A
Rules (Original Mix)	Tim Parker	5A
Creatures (Original Mix)	Cruk, Shyun	4A
Teach You All A Lesson	Mono/Poly	5A
Immortal Light (Original Mix)	G Jones	4A
Warrior	EPROM & G Jones	4A
Time (Original Mix)	G Jones	5A
Helix (Original Mix)	G Jones	11A
Noir (Original Mix)	IMANU	9A
Dream Mentor (Original Mix)	IMANU	4A
Berry Patch (IMANU Remix)	Holly, Machinedrum	12A
Hella Sideways (Original Mix)	Posij	12B
Smile (Original Mix)	Sweatson Klank	10B
Nosferatu's Castle (Original Mix)	Noer the Boy	5A
Zaroff (Original Mix)	Noer the Boy	4A
Tour (Original Mix)	Noer the Boy	2A
Raid (Jon Casey Remix)	Tek Genesis	7A
Mark Instinct & Holly - The Bends (CRIMES! Remix)	Mark Instinct	4A
Dat Buddah Shii (Original Mix)	Balatron	6A
Zout (Original Mix)	Balatron	4A
Actively Faded (Original Mix)	Balatron	9A
Man's Got Game (Sigrah Remix)	TorbjÃ¸rn	12A`
  .split('\n')
  .map(l => l.split('\t'))
  .map(([title, artist, key]) => {
    return {
      title,
      artist,
      keyNumber: key.slice(0, -1),
      isMinor: key[key.length - 1] === 'A',
      popularity: Math.random(),
      energy: Math.random()
    }
  })

const generateTracks = n => {
  return Array.from(Array(n).keys()).map(n => ({
    keyNumber: Math.round(Math.random() * 12),
    isMinor: Math.random() < 0.5,
    name: n,
    popularity: Math.random(),
    energy: Math.random()
  }))
}

let useConservativeKeyTransitions = true

const isSuitableKey = (t1, t2) => Math.abs(t1.keyNumber - t2.keyNumber) % 11 <= 1 &&
  (!useConservativeKeyTransitions || (t1.isMinor === t2.isMinor || t1.keyNumber === t2.keyNumber))

const findSuitableTracks = (current, tracks) => {
  return tracks.filter(t => isSuitableKey(current, t))
}

const suitableKeys = ({keyNumber, isMinor}) => {
  return [
    getKeyString(keyNumber, isMinor), // current

    getKeyString(keyNumber - 1, isMinor), // previous
    (useConservativeKeyTransitions ? null : getKeyString(keyNumber - 1, !isMinor)),

    getKeyString(keyNumber + 1, isMinor), // next
    (useConservativeKeyTransitions ? null : getKeyString(keyNumber + 1, !isMinor))
  ].filter(R.identity)
}

const penaltyFn = fn => (index, value) => Math.pow(fn(index) - value, 2)

assert(isSuitableKey({keyNumber: 1, isMinor: true}, {keyNumber: 1, isMinor: false}))
assert(isSuitableKey({keyNumber: 1, isMinor: false}, {keyNumber: 1, isMinor: true}))
assert(isSuitableKey({keyNumber: 1, isMinor: true}, {keyNumber: 1, isMinor: true}))
assert(isSuitableKey({keyNumber: 1, isMinor: false}, {keyNumber: 1, isMinor: false}))

assert(isSuitableKey({keyNumber: 0, isMinor: true}, {keyNumber: 1, isMinor: true}))
assert(isSuitableKey({keyNumber: 0, isMinor: true}, {keyNumber: 11, isMinor: true}))

assert(!isSuitableKey({keyNumber: 1, isMinor: true}, {keyNumber: 3, isMinor: true}))
assert(!isSuitableKey({keyNumber: 1, isMinor: true}, {keyNumber: 3, isMinor: false}))
assert(!isSuitableKey({keyNumber: 1, isMinor: true}, {keyNumber: 10, isMinor: true}))
assert(!isSuitableKey({keyNumber: 1, isMinor: true}, {keyNumber: 10, isMinor: false}))

assert(!isSuitableKey({keyNumber: 0, isMinor: true}, {keyNumber: 1, isMinor: false}))
assert(!isSuitableKey({keyNumber: 0, isMinor: false}, {keyNumber: 1, isMinor: true}))
assert(!isSuitableKey({keyNumber: 0, isMinor: true}, {keyNumber: 11, isMinor: false}))
assert(!isSuitableKey({keyNumber: 0, isMinor: false}, {keyNumber: 11, isMinor: true}))

useConservativeKeyTransitions = false

assert(isSuitableKey({keyNumber: 1, isMinor: true}, {keyNumber: 1, isMinor: false}))
assert(isSuitableKey({keyNumber: 1, isMinor: false}, {keyNumber: 1, isMinor: true}))
assert(isSuitableKey({keyNumber: 1, isMinor: true}, {keyNumber: 1, isMinor: true}))
assert(isSuitableKey({keyNumber: 1, isMinor: false}, {keyNumber: 1, isMinor: false}))

assert(isSuitableKey({keyNumber: 0, isMinor: true}, {keyNumber: 1, isMinor: true}))
assert(isSuitableKey({keyNumber: 0, isMinor: true}, {keyNumber: 11, isMinor: true}))

assert(!isSuitableKey({keyNumber: 0, isMinor: true}, {keyNumber: 2, isMinor: true}))
assert(!isSuitableKey({keyNumber: 0, isMinor: true}, {keyNumber: 2, isMinor: false}))
assert(!isSuitableKey({keyNumber: 0, isMinor: true}, {keyNumber: 10, isMinor: true}))
assert(!isSuitableKey({keyNumber: 0, isMinor: true}, {keyNumber: 10, isMinor: false}))

assert(isSuitableKey({keyNumber: 0, isMinor: true}, {keyNumber: 1, isMinor: false}))
assert(isSuitableKey({keyNumber: 0, isMinor: false}, {keyNumber: 1, isMinor: true}))
assert(isSuitableKey({keyNumber: 0, isMinor: true}, {keyNumber: 11, isMinor: false}))
assert(isSuitableKey({keyNumber: 0, isMinor: false}, {keyNumber: 11, isMinor: true}))

const getKeyString = (keyNumber, isMinor) => `${keyNumber}${isMinor ? 'A' : 'B' }`
const groupByKeys = R.groupBy(({keyNumber, isMinor}) => getKeyString(keyNumber, isMinor))

const graphWalk = ({tracksByKeys, intros, targetLength, penalties}) => {
  const calculatePenalty = (level, track) => {
    const mapped = Object.keys(penalties).map(name => {
      const {fn, weight} = penalties[name]
      return weight * penaltyFn(fn)(level, track[name]);
    })
    return R.sum(mapped);
  }

  const iterate = (length, current, tracksLeft) => {
    const penalty = calculatePenalty(length, current)
    const atTargetLength = length === targetLength
    const suitableTracks = R.flatten(
      suitableKeys(current).map(key => (tracksLeft[key] || []).filter(t => calculatePenalty(length + 1, t) < 0.2))
    )

    return {
      penalty,
      track: current,
      children: suitableTracks.length === 0 ? undefined : atTargetLength ? [] :
        suitableTracks.map(t => iterate(length + 1, t, R.evolve({[getKeyString(t.keyNumber, t.isMinor)]: R.without([t])}, tracksLeft)))
    }
  }

  const graphStart = Date.now()
  const graph = {
    penalty: 0,
    children: intros.map(intro => iterate(0, intro, R.evolve({[getKeyString(intro)]: R.without([intro])}, tracksByKeys)))
  }
  const graphTime = Date.now() - graphStart

  const handle = (path, penalty, current) => {
    const currentPath = R.append(current.track, path)

    if (current.children === undefined) {
      console.log('Dead end')
    }
    else {
      if (current.children.length === 0) {
        lists.push({path: currentPath, penalty})
        console.log(currentPath.map(({artist, title, keyNumber, isMinor}) => `${artist} - ${title} (${getKeyString(keyNumber, isMinor)})`)
          .join('\n'))
      } else {
        current.children.forEach(c => handle(currentPath, penalty + c.penalty, c))
      }
    }
  }

  const listStart = Date.now()
  const lists = []
  graph.children.forEach(c => handle([], c.penalty, c))
  const listTime = Date.now() - listStart

  console.log(`Tracks: ${R.sum(Object.keys(tracksByKeys).map(k => tracksByKeys[k].length))}, Graph time: ${graphTime}, List time: ${listTime}, Permutations: ${lists.length}`)

  return lists
}

const randomWalk = ({tracks, intros, targetLength, energyFunction, popularityFunction}) => {
  intros = intros || tracks
  let sequences = []
  const permutationsBeforeExit = 10000

  const energyPenaltyFn = penaltyFn(energyFunction)
  const popularityPenaltyFn = penaltyFn(popularityFunction)

  const findSuitableTrack = (current, tracks) => {
    const suitable = findSuitableTracks(current, tracks)
    if (suitable.length === 0) return undefined
    return suitable[Math.round(Math.random() * (suitable.length - 1))]
  }

  const iterate = (n, sequence, originalTracks, tracksLeft, targetLength) => {
    if (n === targetLength - 1) return
    const nextTrack = findSuitableTrack(tracks[R.last(sequence)], tracksLeft)
    if (nextTrack === undefined) return
    sequence.push(tracks.indexOf(nextTrack))
    iterate(n + 1, sequence, originalTracks, R.without([nextTrack], tracksLeft), targetLength)
  }

  for (const intro of intros) {
    let permutations = 0
    const first = tracks.indexOf(intro)
    const triedWithCurrentIntro = []
    console.log('intro', intros.indexOf(intro))

    while (permutations < permutationsBeforeExit) {
      const sequence = [first]
      iterate(0, sequence, tracks, R.without([intro], tracks), targetLength)

      if (!triedWithCurrentIntro.find(R.equals(sequence))) {
        triedWithCurrentIntro.push(sequence)
        permutations++
      } else {
        console.log('duplicate', permutations)
      }
    }

    sequences = sequences.concat(triedWithCurrentIntro)
  }

  const sequencesWithPenalties = sequences.map(order => {
    const penalty = order.reduce((acc, n, i) => ({
      energy: acc.energy + energyPenaltyFn(i, tracks[n].energy),
      popularity: acc.popularity + popularityPenaltyFn(i, tracks[n].popularity)
    }), {energy: 0, popularity: 0})
    return {order, penalty}
  })

  const sortedSequences = R.sortBy(({penalty: {energy, popularity}}) => 3 * energy + popularity, sequencesWithPenalties).slice(-10)

  const separator = '\t'

  console.log('orders\n', sortedSequences.map(({penalty, order}) => `${3 * penalty.energy + penalty.popularity}\t${order.join(separator)}`).join('\n'))
  console.log('keys\n', sortedSequences.map(s => s.order.map(n => tracks[n].keyNumber).join(separator)).join('\n'))
  console.log('energies\n', tracks.map((_, i) => energyFunction(i)).join(separator),
    sortedSequences.map(t => t.order.map(n => tracks[n].energy).join(separator)).join('\n'))
  console.log('popularities\n', tracks.map((_, i) => popularityFunction(i)).join(separator),
    sortedSequences.map(t => t.order.map(n => tracks[n].popularity).join(separator)).join('\n'))
}

// const tracks = generateTracks(50)
const intros = tracks.slice(0, 5)
const energyFunction = n => Math.abs(Math.sin(n / 2))
const popularityFunction = n => (Math.sin(n) + 1) / 2

// randomWalk({tracks, intros, targetLength: 20, energyFunction, popularityFunction})

// for (let i = 10; i < 50; i += 1) {
//   graphWalk({tracks: tracks.slice(0, i), intros, targetLength: 10, energyFunction, popularityFunction})
// }

console.log(R.sortBy(R.prop('penalty'), graphWalk({
  tracksByKeys: groupByKeys(tracks.slice(0, 80)),
  intros: tracks.slice(0, 2),
  targetLength: 10,
  penalties: {
    energy: {
      fn: energyFunction,
      weight: 3
    },
    popularity: {
      fn: popularityFunction,
      weight: 1
    }
  }
}))[0]
  .path
  .map(({artist, title, keyNumber, isMinor}) => `${artist} - ${title} (${getKeyString(keyNumber, isMinor)})`)
  .join('\n'))