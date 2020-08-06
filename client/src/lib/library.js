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
            'k, c, ch, cc, lk, qu, q(u), ck, x': ['cat', 'kitten', 'duck', 'school', 'occur', 'antique', 'cheque', 'kit', 'chris', 'accent', 'folk', 'bouquet', 'queen', 'rack', 'box'],
            'l, ll': ['live', 'well', 'leg', 'bell'],
            'm, mm, mb, mn, lm': ['man', 'summer', 'comb', 'column', 'palm', 'mad', 'hammer', 'lamb'],
            'n, nn, kn, gn, pn': ['no', 'dinner', 'knee', 'gnome', 	'net', 'funny', 'know', 'gnat', 'pneumonic'],
            'p, pp': ['pin', 'dippy', 'pie', 'apple'],
            'r, rr, wr, rh': ['run', 'marry', 'write', 'carrot', 'wrench', 'rhyme'],
            's, ss, c, sc, ps, st, ce, se': ['sit', 'less', 'circle', 'scene', 'psycho', 'listen', 'pace', 'course', 'sun', 'mouse', 'dress', 'city', 'ice', 'science'],
            't, tt, th, ed': ['top', 'letter', 'stopped', 'tip', 'matter', 'thomas', 'ripped'],
            'v, f, ph, ve': ['vine', 'of', 'stephen', 'five', 'vet', 'give'],
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
            'h, wh': ['hop', 'who', 'hot'],
            'j, ge, g, dge, di, gg': ['jam', 'wage', 'giraffe', 'edge', 'soldier', 'exaggerate', 'jet', 'cage', 'barge', 'judge'],
            'k, c, ch, cc, lk, qu, q(u), ck, x': ['cat', 'kitten', 'duck', 'school', 'occur', 'antique', 'cheque', 'kit', 'chris', 'accent', 'folk', 'bouquet', 'queen', 'rack', 'box'],
            'l, ll': ['live', 'well', 'leg', 'bell'],
            'm, mm, mb, mn, lm': ['man', 'summer', 'comb', 'column', 'palm', 'mad', 'hammer', 'lamb'],
            'n, nn, kn, gn, pn': ['no', 'dinner', 'knee', 'gnome', 	'net', 'funny', 'know', 'gnat', 'pneumonic'],
            'p, pp': ['pin', 'dippy', 'pie', 'apple'],
            'r, rr, wr, rh': ['run', 'marry', 'write', 'carrot', 'wrench', 'rhyme'],
            's, ss, c, sc, ps, st, ce, se': ['sit', 'less', 'circle', 'scene', 'psycho', 'listen', 'pace', 'course', 'sun', 'mouse', 'dress', 'city', 'ice', 'science'],
            't, tt, th, ed': ['top', 'letter', 'stopped', 'tip', 'matter', 'thomas', 'ripped'],
            'v, f, ph, ve': ['vine', 'of', 'stephen', 'five', 'vet', 'give'],
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
        }
    }
}

export default library;