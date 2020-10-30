
// learn built in functions for JS

import React, { useState } from 'react'

const FILTERS = {
  ALL: 'all',
  UNCOMPLETED: 'uncompleted',
  COMPLETED: 'completed'
}

const ListItem = React.memo(({ changesCompleted, value, completed }) => {
  // when usesing boolean in state make hooks readable as boolean
  const [isCompleted, setIsCompleted] = useState(completed)

  const onUpdateItem = () => {
    setIsCompleted(!isCompleted)
    changesCompleted(value, completed)
  }

  return (
    <li onClick={onUpdateItem} style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
      {value}
    </li>
  )
}, (prevProps, nextProps) => {
  return (JSON.stringify(prevProps) === JSON.stringify(nextProps))
})

ListItem.displayName = 'ListItem'


class List extends React.Component {
  state = {
    value: '',
    listItems: [
      {
        value: 'first todo',
        completed: true
      },
      {
        value: 'second todo',
        completed: false
      },
      {
        value: 'third todo',
        completed: false
      }
    ],
    filter: FILTERS.ALL
  } ;

  
  handleChange = (event) => {
    event.persist()
    const { value } = event.target
    this.setState({ value })
  }

  sendData = async (event) => {
    event.preventDefault()
    const { value } = this.state
    try {
    // sendData with fetch
    
      this.setState((prevState) => ({
        listItems: [...prevState.listItems, { value, completed: false }],
        value: ''
      }))
      // throw Error('THE SERVER FUCKED')
    } catch (err) {
      console.log(err)
    }
  }
  //filter passed in is definately a filter
  setFilter = (filter) => {
    this.setState({ filter })
  }

  changesCompleted = (value, completed) => {
    const [ listItems ] = this.state

    const itemIndex = this.state.listItems.findIndex(item => item.value === value)
    console.log(itemIndex)

    listItems.splice(itemIndex, 0)
    this.setState = ({ listItems: [...listItems, {
      value,
      completed: !completed
    }] })
  }

  render(){
    const { listItems, value, filter } = this.state
    return (
      <div>
        {/* using form data as I assume I'm saving the data to a server */}
        <form onSubmit={(event) => this.sendData(event)}>
          <div>
            <input
              placeholder="list item"
              onChange={(event) => this.handleChange(event)}
              value={value}
            />
          </div>
          <button type='submit'>
            Add to list
          </button>
        </form>
        <div>
          <button type='button' onClick={() => this.setFilter(FILTERS.ALL)}>all</button>
          <button type='button' onClick={() => this.setFilter(FILTERS.UNCOMPLETED)}>uncompleted</button>
          <button type='button' onClick={() => this.setFilter(FILTERS.COMPLETED)}>completed</button>
        </div>
        <ul>
          {/* not using index as key to avoid unnecessary re-render */}
          {listItems.map((item) => {
            const { value, completed } = item
            if (filter === FILTERS.ALL) return <ListItem changesCompleted={this.changesCompleted.bind(this)} key={value} {...item}/>
            if (completed === true && filter === FILTERS.COMPLETED) return <ListItem changesCompleted={this.changesCompleted.bind(this)} key={value} {...item}/>
            if (completed === false && filter === FILTERS.UNCOMPLETED) return <ListItem changesCompleted={this.changesCompleted.bind(this)} key={value} {...item}/>
            return null
          })}
        </ul>
      </div>
    )
  }
}


export default List

