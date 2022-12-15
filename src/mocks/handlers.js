import { rest } from 'msw'
export const BASE_URL = 'http://localhost:3030'
export const handlers = [
  rest.get(`${BASE_URL}/scoops`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: 'chocolate',
          imageUrl: '/images/chocolate.png',
        },
        {
          name: 'vanilla',
          imageUrl: '/images/vanilla.png'
        }
      ])
    )
  }),
  rest.get(`${BASE_URL}/toppings`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: 'cherries',
          imageUrl: '/images/cherries.png'
        },
        {
          name: 'm&m', imageUrl: '/images/m&m.png'
        },
        { name: 'hot fudge', imageUrl: '/images/hot-fudge.png'}
      ])
    )
  })
]
