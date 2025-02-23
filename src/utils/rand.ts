const LetterNum = [] as unknown[]

for (let i = 48; i <= 57; i++) {
  LetterNum.push(String.fromCharCode(i))
}
for (let i = 65; i <= 90; i++) {
  LetterNum.push(String.fromCharCode(i))
}

for (let i = 97; i <= 122; i++) {
  LetterNum.push(String.fromCharCode(i))
}

const randIdMap = {}

export function getRandLetterNum(len) {
  const str: any[] = []

  for (let i = 0; i < len; i++) {
    str.push(LetterNum[Math.round(Math.random() * LetterNum.length) % LetterNum.length])
  }
  const id = str.join('')
  if (randIdMap[id]) {
    return getRandLetterNum(len)
  }
  randIdMap[id] = true
  return id
}
