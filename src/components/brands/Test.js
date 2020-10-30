
// // learn built in functions for JS

import React, { useState } from 'react'

// const ListItem = ({ value, completed }) => {
//   // when usesing boolean in state make hooks readable as boolean
//   const [isCompleted, setIsCompleted] = useState(completed)

//   return (
//     <li onClick={() => setIsCompleted(!isCompleted)} style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
//       {value}
//     </li>
//   )
// }

// class List extends React.Component {
//   state = {
//     value: '',
//     listItems: [
//       {
//         value: 'first todo',
//         completed: true
//       },
//       {
//         value: 'second todo',
//         completed: false
//       },
//       {
//         value: 'third todo',
//         completed: false
//       }
//     ]
//   };
  
//   handleChange = (event) => {
//     event.persist()
//     const { value } = event.target
//     this.setState({ value })
//   }

//   sendData = async (event) => {
//     event.preventDefault()
//     const { value } = this.state
//     try {
//     // sendData with fetch
    
//       this.setState((prevState) => ({
//         listItems: [...prevState.listItems, { value, completed: false }],
//         value: ''
//       }))
//       // throw Error('THE SERVER FUCKED')
//     } catch (err) {
//       console.log(err)
//     }
//   }
//   //filter passed in is definately a filter
//   setFilter = (filter) => {
//     this.setState({ filter })
//   }

//   render(){
//     const { listItems, value } = this.state
//     return (
//       <div>
//         {/* using form data as I assume I'm saving the data to a server */}
//         <form onSubmit={(event) => this.sendData(event)}>
//           <div>
//             <input
//               placeholder="list item"
//               onChange={(event) => this.handleChange(event)}
//               value={value}
//             />
//           </div>
//           <button type='submit'>
//             Add to list
//           </button>
//         </form>
//         <ul>
//           {/* not using index as key to avoid unnecessary re-render */}
//           {listItems.map((item) => {
//             const { itemValue } = item
//             return <ListItem key={itemValue} {...item}/>
//           })}
//         </ul>
//       </div>
//     )
//   }
// }


// export default List

const BlogPost = () => {
  const [datas, setDatas] = useState([
    {
      id: 1,
      name: 'john',
      gender: 'm'
    },
    {
      id: 2,
      name: 'mary',
      gender: 'f'
    }
  ])

  const updateFieldChanged = event => {
    event.persist()
    console.log(event.target.value, event.target.name)
    const users = [...datas]
    users.map(userObj => {
      if (userObj.id === event.target.name) return userObj.name = event.target.value
    })
    // const newUser = { ...user, name: event.target.value }
    console.log(users)
  }

  return (
    <div>
      {datas.map((data, index) => (
        <li key={data.name}>
          <input type="text" name={data.id} onChange={(event) => updateFieldChanged(event)}  />
          <span>{data.name}</span>
        </li>
      ))
      }
    </div>
  )
}
  
export default BlogPost
