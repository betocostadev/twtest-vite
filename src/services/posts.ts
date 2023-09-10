import api from '../boot/axios'

const getPosts = async () => {
  const url = `/posts/`
  const response = await api.get(url)
  return response.data
}

export default { getPosts }
