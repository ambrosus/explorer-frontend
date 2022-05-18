import axios from 'axios'

describe('API', () => {
  test('axios work', async () => {
    axios.get = jest.fn()
    expect(axios.get).not.toHaveBeenCalled()
    axios.get('/users')
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('/users')
  })
})
