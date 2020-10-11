const library = {
    symbolsList: [
        'b',
        'd',
        'f',
        'g',
        'h',
        'dʒ',
        'k',
        'l',
        'm',
        'n',
        'p',
        'r',
        's',
        't',
        'v',
        'w',
        'z',
        'ʒ',
        'tʃ',
        'ʃ',
        'θ',
        'ð',
        'ŋ',
        'j',
        'æ',
        'eɪ',
        'e',
        'i:',
        'ɪ',
        'aɪ',
        'ɒ',
        'oʊ',
        'ʊ',
        'ʌ',
        'u:',
        'ɔɪ',
        'aʊ',
        'ə',
        'eəʳ',
        'ɑ:',
        'ɜ:ʳ',
        'ɔ:',
        'ɪəʳ',
        'ʊəʳ'
    ],
    phonemesList: [
        'b, bb',
        'd, dd, ed',
        'f, ff, ph, gh, lf, ft',
        'g, gg, gh, gu, gue',
        'h, wh',
        'j, ge, g, dge, di, gg',
        'k, c, ch, cc, lk, qu, q(u), ck, x',
        'l, ll',
        'm, mm, mb, mn, lm',
        'n, nn, kn, gn, pn',
        'p, pp',
        'r, rr, wr, rh',
        's, ss, c, sc, ps, st, ce, se',
        't, tt, th, ed',
        'v, f, ph, ve',
        'w, wh, u, o',
        'z, zz, s, ss, x, ze, se',
        's, si, z',
        'ch, tch, tu, ti, te',
        'sh, ce, s, ci, si, ch, sci, ti',
        'th (θ)',
        'th (ð)',
        'ng, n, ngue',
        'y, i, j',
        'a, ai, au',
        'a, ai, eigh, aigh, ay, er, et, ei, au, a_e, ea, ey',
        'e, ea, u, ie, ai, a, eo, ei, ae',
        'e, ee, ea, y, ey, oe, ie, i, ei, eo, ay',
        'i, e, o, u, ui, y, ie',
        'i, y, igh, ie, uy, ye, ai, is, eigh, i_e',
        'a, ho, au, aw, ough',
        'o, oa, o_e, oe, ow, ough, eau, oo, ew',
        'o, oo, u, ou',
        'u, o, oo, ou',
        'o, oo, ew, ue, u_e, oe, ough, ui, oew, ou',
        'oi, oy, uoy',
        'ow, ou, ough',
        'a, er, i, ar, our, ur',
        'air, are, ear, ere, eir, ayer',
        'a',
        'ir, er, ur, ear, or, our, yr',
        'aw, a, or, oor, ore, oar, our, augh, ar, ough, au',
        'ear, eer, ere, ier',
        'ure, our'
    ],
    gameLibrary: {
        phonics: [
            [],
            [],
            [],
            [],
            [],
        ],
        wordLists: {
            'b, bb': ['bug', 'bubble', 'big', 'rubber'],
            'd, dd, ed': ['dad', 'add', 'milled', 'dog', 'filled'],
            'f, ff, ph, gh, lf, ft': ['fat', 'cliff', 'phone', 'enough', 'half', 'often'],
            'g, gg, gh, gu, gue': ['gun', 'egg', 'ghost', 'guest', 'prologue', 'go'],
            'h, wh': ['hop', 'who', 'hot'],
            'j, ge, g, dge, di, gg': ['jam', 'wage', 'giraffe', 'edge', 'soldier', 'exaggerate', 'jet', 'cage', 'barge', 'judge'],
            'k, c, ch, cc, lk, qu, q(u), ck, x': ['cat', 'kitten', 'duck', 'school', 'occur', 'antique', 'cheque', 'kit', 'Chris', 'accent', 'folk', 'bouquet', 'queen', 'rack', 'box'],
            'l, ll': ['live', 'well', 'leg', 'bell'],
            'm, mm, mb, mn, lm': ['man', 'summer', 'comb', 'column', 'palm', 'mad', 'hammer', 'lamb'],
            'n, nn, kn, gn, pn': ['no', 'dinner', 'knee', 'gnome', 	'net', 'funny', 'know', 'gnat', 'pneumonic'],
            'p, pp': ['pin', 'dippy', 'pie', 'apple'],
            'r, rr, wr, rh': ['run', 'marry', 'write', 'carrot', 'wrench', 'rhyme'],
            's, ss, c, sc, ps, st, ce, se': ['sit', 'less', 'circle', 'scene', 'psycho', 'listen', 'pace', 'course', 'sun', 'mouse', 'dress', 'city', 'ice', 'science'],
            't, tt, th, ed': ['top', 'letter', 'stopped', 'tip', 'matter', 'Thomas', 'ripped'],
            'v, f, ph, ve': ['vine', 'of', 'Stephen', 'five', 'vet', 'give'],
            'w, wh, u, o': ['wet', 'win', 'swim', 'wit', 'why', 'quick', 'choir'],
            'z, zz, s, ss, x, ze, se': ['zed', 'buzz', 'his', 'scissors', 'xylophone', 'craze', 'zip', 'fizz', 'sneeze', 'laser', 'is', 'was', 'please', 'Xerox', 'xylophone' ],
            's, si, z': ['treasure', 'division', 'azure'],
            'ch, tch, tu, ti, te': ['chip', 'watch', 'future', 'action', 'righteous', 'match'],
            'sh, ce, s, ci, si, ch, sci, ti': ['ship', 'mission', 'chef', 'motion', 'special', 'sham', 'ocean', 'sure', 'pension', 'machine', 'conscience', 'station'],
            'th (θ)': ['thought', 'thumb', 'thin', 'thing'],
            'th (ð)': ['this', 'feather', 'then', 'leather'],
            'ng, n, ngue': ['ring', 'pink', 'tongue', 'sing', 'monkey', 'sink'],
            'y, i, j': ['you', 'onion', 'hallelujah', 'yes'],
            'a, ai, au': ['hat', 'laugh', 'cat', 'plaid'],
            'a, ai, eigh, aigh, ay, er, et, ei, au, a_e, ea, ey': ['bay', 'maid', 'weigh', 'straight', 'pay', 'foyer', 'filet', 'eight', 'gauge', 'mate', 'break', 'they', 'bacon', 'late', 'day', 'train', 'vein'],
            'e, ea, u, ie, ai, a, eo, ei, ae': ['end', 'bread', 'bury', 'friend', 'said', 'many', 'leopard', 'heifer', 'aesthetic', 'bed'],
            'e, ee, ea, y, ey, oe, ie, i, ei, eo, ay': ['me', 'these', 'beat', 'feet', 'key', 'chief', 'baby', 'be', 'meat', 'lady', 'phoenix', 'grief', 'ski', 'deceive', 'people'],
            'i, e, o, u, ui, y, ie': ['it', 'england', 'women', 'busy', 'guild', 'gym', 'sieve', 'if'],
            'i, y, igh, ie, uy, ye, ai, is, eigh, i_e': ['find', 'ride', 'light', 'fly', 'pie', 'spider', 'sky', 'night', 'guy', 'stye', 'aisle', 'island', 'height', 'kite'],
            'a, ho, au, aw, ough': ['swan', 'honest', 'maul', 'slaw', 'fought', 'hot', 'want', 'haul', 'draw', 'bought'],
            'o, oa, o_e, oe, ow, ough, eau, oo, ew': ['open', 'moat', 'bone', 'toe', 'sow', 'dough', 'beau', 'brooch', 'sew', 'no', 'note', 'boat', 'soul', 'row'],
            'o, oo, u, ou': ['wolf', 'look', 'bush', 'would'],
            'u, o, oo, ou': ['lug', 'monkey', 'blood', 'double'],
            'o, oo, ew, ue, u_e, oe, ough, ui, oew, ou': ['who', 'loon', 'dew', 'blue', 'flute', 'shoe', 'through', 'fruit', 'manoeuvre', 'group'],
            'oi, oy, uoy': ['join', 'boy', 'buoy', 'coin', 'toy'],
            'ow, ou, ough': ['cow', 'out', 'mouse', 'house', 'now', 'shout', 'bough'],
            'a, er, i, ar, our, ur': ['about', 'ladder', 'pencil', 'dollar', 'honour', 'augur'],
            'air, are, ear, ere, eir, ayer': ['chair', 'dare', 'pear', 'where', 'their', 'prayer'],
            'a': ['arm', 'car'],
            'ir, er, ur, ear, or, our, yr': ['bird', 'term', 'burn', 'pearl', 'word', 'journey', 'myrtle', 'first', 'fern', 'heard', 'work', 'dollar'],
            'aw, a, or, oor, ore, oar, our, augh, ar, ough, au': ['paw', 'ball', 'fork', 'poor', 'fore', 'board', 'four', 'war'],
            'ear, eer, ere, ier': ['ear', 'steer', 'here', 'tier', 'mirror', 'cheer'],
            'ure, our': ['cure', 'tourist']
        },
        sentenceLists: {
            'b, bb': {
                'bug':'The bug was very fat.', 
                'bubble': `Let's pop the bubble!.`, 
                'big': 'Your dog is really big.',
                'rubber': 'Tires are made of rubber.'
            }, 
            'd, dd, ed': {
                'dad': 'My dad is 30 years old.',
                'add': 'Add more money. Or else.',
                'milled': 'I like milled coffee.',
                'dog': `This dog isn't worth your time.`,
                'filled': `I didn't know the position was filled.`
            },
            'f, ff, ph, gh, lf, ft': {
                'fat': 'I feel fat and lazy.',
                'cliff': 'The car slid off the cliff before I got back.',
                'phone': 'The phone woke me.',
                'enough': 'She had enough for the entire family.',
                'half': 'And that was almost half a century ago!',
                'often': 'It is often still warm.'
            },
            'g, gg, gh, gu, gue': {
                'gun': 'I never shot a gun in my life.',
                'egg': 'The egg popped grease and she jumped back.',
                'ghost': `Now it's a ghost town.`, 
                'guest': `She's a house guest, not a prisoner.`,
                'prologue': 'The Rule consists of a prologue and 73 chapters.',  
                'go': 'Maybe we should go home.'
            },
            'h, wh': {
                'hop': 'All of the children could hop.',
                'who': 'Who is responsible?',
                'hot': 'It was a hot day in Portland.'
            },
            'j, ge, g, dge, di, gg': {
                'jam': 'I learned how to make strawberry jam.', 
                'wage': 'What is your hourly wage?', 
                'giraffe':'That giraffe has a very long neck.', 
                'edge':'Watch out near the cliff edge.', 
                'soldier':'My sister became a soldier.', 
                'exaggerate':'Oh, he really likes to exaggerate things.', 
                'jet':'The jet took off with great speed.', 
                'cage':`I don't like to keep the bird in its cage.`, 
                'barge':'We rode a barge out to the island.', 
                'judge': `My father told me not to judge.`
            },
            'k, c, ch, cc, lk, qu, q(u), ck, x': {
                'cat': `Don't forget to feed the cat.`, 
                'kitten': 'That kitten is so small!', 
                'duck': 'Do you like duck liver?', 
                'school': 'School is out for summer!', 
                'occur': `I never knew such a thing could occur`, 
                'antique': 'This is an antique chair.', 
                'cheque': `Waiter, please bring the cheque.`, 
                'kit': 'We always take an emergency kit.', 
                'Chris': `My brother's name is Chris.` , 
                'accent': 'People in Hokkaido have a weird accent.', 
                'folk': 'I listen to folk music all the time.', 
                'bouquet': 'We bought her a bouqet of flowers.', 
                'queen': 'Remember to bow to the queen.', 
                'rack': 'We put the fish on a rack to dry.', 
                'box': `What's in the box?`
            },
            'l, ll': {
                'live':'I never thought I would live in a place like this.', 
                'well':'The well was built years ago.', 
                'leg': 'My right leg is longer than my left leg.', 
                'bell': 'The bell rings every night.'
            },
            'm, mm, mb, mn, lm': {
                'man': `Don't ever touch my man.`, 
                'summer': 'The summer was long and hot.', 
                'comb': 'I got this ivory comb from my grandfather.', 
                'column': 'We drew a face in every column.', 
                'palm': 'I got a scratch in my palm.', 
                'mad': 'The hatter went mad.', 
                'hammer': 'Any hammer is better than no hammer.', 
                'lamb': 'We put the new lamb out in the field.'
            },
            'n, nn, kn, gn, pn': {
                'no': 'I said no to the offer.', 
                'dinner': 'Dinner is served, everyone.', 
                'knee': 'My knee has really been acting up.', 
                'gnome': 'The gnome lives in our garden.', 
                'net': 'We fish using a net.', 
                'funny': 'That guy is super funny!',
                'gnat': 'Keep an eye out for that gnat.', 
                'pneumonic': 'I had some pneumonic problems recently.'
            },
            'p, pp': {
                'pin': `Let's play pin the tail on the donkey.`, 
                'dippy': `She's always a bit dippy after lunch.`, 
                'pie':`We'll bring a pie to the dinner.`, 
                'apple':'I bought a fresh apple.'
            },
            'r, rr, wr, rh': {
                'run': 'I always go for a run in the morning.', 
                'marry': `I didn't have any plans to marry so soon.`, 
                'write': `We were asked to write a love letter.`, 
                'carrot': 'You always need carrot for curry.', 
                'wrench': 'We believe he was hit with a wrench.', 
                'rhyme': 'Rappers always come up with the best rhyme.'
            },
            's, ss, c, sc, ps, st, ce, se': {
                'sit': `I couldn't wait to sit down.`, 
                'less': 'Less is more, my friend.', 
                'circle': `Let's circle around back.`, 
                'scene': 'This is my favorite scene.', 
                'psycho': 'Have you ever watched American Psycho?', 
                'listen': 'I like to listen to music.', 
                'pace': 'He set a blistering pace.', 
                'course': 'This is a four-course meal.', 
                'sun': 'The sun is extra bright today.', 
                'mouse': 'She owned a little mouse.', 
                'dress': `That's a really nice dress.`, 
                'city': 'We live in the city.', 
                'ice': 'We scream for ice cream.', 
                'science': 'When is science class today?'
            },
            't, tt, th, ed': {
                'top': 'We made it to the top!', 
                'letter': 'Did you send me a letter?', 
                'stopped': 'She stopped in the name of love.', 
                'tip': 'I really like the tip culture in America.', 
                'matter': 'Why does it matter?', 
                'Thomas': 'Thomas was a complete fool.', 
                'ripped': 'My ripped jeans look too good on me.'
            },
            'v, f, ph, ve': {
                'vine': 'The vine had grown up the wall.', 
                'of': 'Are you sure of its authenticity?', 
                'Stephen': 'Stephen, your shoe is untied.', 
                'five': 'We have made five cakes.', 
                'vet': 'The vet saved my cat!', 
                'give': 'To give is to receive.'
            },
            'w, wh, u, o': {
                'wet': 'The floor was wet.', 
                'win': 'Are you ready to win big?', 
                'swim': `Let's go for a swim!`, 
                'wit': 'That girl has a ton of wit.', 
                'why': 'Do you know why?', 
                'quick': 'Coming from the U.K., she knew how to do quick maths.', 
                'choir': 'The choir was completely ready.'
            },
            'z, zz, s, ss, x, ze, se': {
                'zed': `In the States, we don't say zed.`, 
                'buzz': 'Big bees have a very loud buzz.', 
                'his': 'Is this his bag?', 
                'scissors': 'Can you hand me the scissors?', 
                'xylophone': 'She has played the xylophone since kindergarten.', 
                'craze': `Pizza, it's the new craze!`, 
                'zip': 'Can you zip up my bag?', 
                'fizz': 'This soda water has a nice fizz.', 
                'sneeze': 'After we sneeze, we regret.', 
                'laser': 'The sky was full of rock and roll laser magic.', 
                'is': 'She is the prophet.', 
                'was': 'She was the prophet.', 
                'please': `Please don't light the house on fire.`, 
                'Xerox': 'Can you xerox this for me?',
            },
            's, si, z': {
                'treasure':'We are off to look for the treasure!', 
                'division': 'This division has been hit hard.', 
                'azure': 'Is azure a color?'
            },
            'ch, tch, tu, ti, te': {
                'chip': 'She has a big chip on her shoulder.', 
                'watch': 'That team is definitely worth a watch.', 
                'future': 'The future is unknown.', 
                'action': 'We must take action!', 
                'righteous': 'What is righteous in such a world?', 
                'match': 'The match burned out.'
            },
            'sh, ce, s, ci, si, ch, sci, ti': {
                'ship': 'We boarded the ship.', 
                'mission': `What's my mission, sir?`, 
                'chef': 'She really is a good chef.', 
                'motion': 'She motioned me over.', 
                'special': `What's so special about a rock?`, 
                'sham': 'The whole thing was a sham.', 
                'ocean': 'The ocean was calm that day.', 
                'sure': 'Are you sure?', 
                'pension': 'Her pension was just enough.', 
                'machine': 'The machine lumbered off.', 
                'conscience': 'Clear your conscience.', 
                'station': 'We made it to the station.'
            },
            'th (θ)': ['thought', 'thumb', 'thin', 'thing'],
            'th (ð)': ['this', 'feather', 'then', 'leather'],
            'ng, n, ngue': ['ring', 'pink', 'tongue', 'sing', 'monkey', 'sink'],
            'y, i, j': ['you', 'onion', 'hallelujah', 'yes'],
            'a, ai, au': ['hat', 'laugh', 'cat', 'plaid'],
            'a, ai, eigh, aigh, ay, er, et, ei, au, a_e, ea, ey': ['bay', 'maid', 'weigh', 'straight', 'pay', 'foyer', 'filet', 'eight', 'gauge', 'mate', 'break', 'they', 'bacon', 'late', 'day', 'train', 'vein'],
            'e, ea, u, ie, ai, a, eo, ei, ae': ['end', 'bread', 'bury', 'friend', 'said', 'many', 'leopard', 'heifer', 'aesthetic', 'bed'],
            'e, ee, ea, y, ey, oe, ie, i, ei, eo, ay': ['me', 'these', 'beat', 'feet', 'key', 'chief', 'baby', 'be', 'meat', 'lady', 'phoenix', 'grief', 'ski', 'deceive', 'people'],
            'i, e, o, u, ui, y, ie': ['it', 'england', 'women', 'busy', 'guild', 'gym', 'sieve', 'if'],
            'i, y, igh, ie, uy, ye, ai, is, eigh, i_e': ['find', 'ride', 'light', 'fly', 'pie', 'spider', 'sky', 'night', 'guy', 'stye', 'aisle', 'island', 'height', 'kite'],
            'a, ho, au, aw, ough': ['swan', 'honest', 'maul', 'slaw', 'fought', 'hot', 'want', 'haul', 'draw', 'bought'],
            'o, oa, o_e, oe, ow, ough, eau, oo, ew': ['open', 'moat', 'bone', 'toe', 'sow', 'dough', 'beau', 'brooch', 'sew', 'no', 'note', 'boat', 'soul', 'row'],
            'o, oo, u, ou': ['wolf', 'look', 'bush', 'would'],
            'u, o, oo, ou': ['lug', 'monkey', 'blood', 'double'],
            'o, oo, ew, ue, u_e, oe, ough, ui, oew, ou': ['who', 'loon', 'dew', 'blue', 'flute', 'shoe', 'through', 'fruit', 'manoeuvre', 'group'],
            'oi, oy, uoy': ['join', 'boy', 'buoy', 'coin', 'toy'],
            'ow, ou, ough': ['cow', 'out', 'mouse', 'house', 'now', 'shout', 'bough'],
            'a, er, i, ar, our, ur': ['about', 'ladder', 'pencil', 'dollar', 'honour', 'augur'],
            'air, are, ear, ere, eir, ayer': ['chair', 'dare', 'pear', 'where', 'their', 'prayer'],
            'a': ['arm', 'car'],
            'ir, er, ur, ear, or, our, yr': ['bird', 'term', 'burn', 'pearl', 'word', 'journey', 'myrtle', 'first', 'fern', 'heard', 'work', 'dollar'],
            'aw, a, or, oor, ore, oar, our, augh, ar, ough, au': ['paw', 'ball', 'fork', 'poor', 'fore', 'board', 'four', 'war'],
            'ear, eer, ere, ier': ['ear', 'steer', 'here', 'tier', 'mirror', 'cheer'],
            'ure, our': ['cure', 'tourist']
        }
    }
}

export default library;