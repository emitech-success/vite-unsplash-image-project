import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useGblobalContext } from "./context"

const url = `https://api.unsplash.com/search/photos?client_id=${import.meta.env.VITE_API_KEY}`
console.log(import.meta.env.VITE_API_KEY);

const Gallery = () => {
  const {searchTerm} = useGblobalContext()
  const response = useQuery({
    queryKey: ["images", searchTerm],
    queryFn:async ()=> {
      const result = await axios.get(`${url}&query=${searchTerm}`)
      return result.data
    }
  })
  if (response.isLoading) {
    return <section className="image-container">
      <h4>Loading ...</h4>
    </section>
  }
  if (response.isError) {
    return <section className="image-container">
      <h4>There was an error ...</h4>
    </section>
  }
  const results = response.data.results
  if (results.length < 1) {
    return <section className="image-container">
      <h4>No result found</h4>
    </section>
  }
  return (
    <section className="image-container">
      {results.map((item) =>{
        const {urls, id, alt_description} = item
        const url = urls?.regular

        return <img key={id} src={url} alt={alt_description} className="img" />
      })}
    </section>
  )
}
export default Gallery