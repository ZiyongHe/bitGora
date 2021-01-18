const mongoose = require('mongoose')
const { Schema } = mongoose

const messageSchema = new Schema({
  body: String,
  senderId: String,
})
const Message = mongoose.model('Message', messageSchema)

module.exports = Message

// cat model template

// import React from 'react'

// function CatList() {
//   const [cats, setCats] = React.useState([])

//   React.useEffect(() => {
//     fetch('/api/cats')
//       .then((response) => {
//         if (!response.ok) throw new Error(response.statusText)
//         return response.json()
//       })
//       .then((payload) => setCats(payload.data))
//       .catch(console.log)
//   }, [])

//   if (!cats.length) return <div>Sorry, no cats.</div>

//   return (
//     <div className="CatList">
//       <ul>
//         {cats.map((cat) => (
//           <li key={cat._id}>{cat.name}</li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default CatList
