import React from 'react'
import ImageUpload from '../ImageUpload'
import Select from 'react-select'

const UserForm = ({ data, options, handleMultiChange, handleChange, handleDelete, handleSubmit, errors }) => {

  const prePopulateArray = data.skills.map(skill => {
    return { value: skill, label: skill }
  })

  return (
    <section className='user-section'>
      <form onSubmit={handleSubmit} className='user-container'>
        <div className='user-info'>
          <h2 className='title'>Edit profile</h2>
          <div className='field'>
            <label className='label'>NAME</label>
            <div className='control'>
              <input
                className={`input is-rounded ${errors.name ? 'is-danger' : ''}`}
                placeholder='Name'
                name='name'
                onChange={handleChange}
                value={data.name}
              />
            </div>
            {errors.name && <small className='help is-danger'>{errors.name}</small>}
          </div>
          <div className='field'>
            <label className='label'>EMAIL</label>
            <div className='control'>
              <input
                className={`input is-rounded ${errors.email ? 'is-danger' : ''}`}
                placeholder='Email'
                name='email'
                onChange={handleChange}
                value={data.email}
              />
            </div>
            {errors.email && <small className='help is-danger'>{errors.email}</small>}
          </div>
          <div className='field'>
            <label className='label'>PASSWORD</label>
            <div className='control'>
              <input
                className={`input is-rounded ${errors.password ? 'is-danger' : ''}`}
                type='password'
                placeholder='Password'
                name='password'
                onChange={handleChange}
              />
            </div>
            {errors.password && <small className='help is-danger'>{errors.password}</small>}
          </div>
          <div className='field'>
            <label className='label'>PASSWORD CONFIRMATION</label>
            <div className='control'>
              <input
                className={`input is-rounded ${errors.passwordConfirmation ? 'is-danger' : ''}`}
                type='password'
                placeholder='Password Confirmation'
                name='passwordConfirmation'
                onChange={handleChange}
              />
            </div>
            {errors.passwordConfirmation && <small className='help is-danger'>{errors.passwordConfirmation}</small>}
          </div>
        </div>
        <div className='user-image'>
          {
            data.image ?
              <ImageUpload
                handleChange={handleChange}
                fieldName='image'
                inputClassName='my-input-class'
              >
                <button onClick={ImageUpload} className='button is-danger'>Image Upload</button>
              </ImageUpload>
              :
              <ImageUpload
                handleChange={handleChange}
                fieldName='image'
                inputClassName='my-input-class'
              >
                <button onClick={ImageUpload} className='button is-danger'>Image Upload</button>
              </ImageUpload>
          }
          <button type='submit' className='button  is-rounded is-primary'>SAVE</button>
          <br />
          <button onClick={handleDelete} className='button is-danger'>Delete Profile</button>
        </div>
        <div className='skills-recipes'>
          <div className='fieldContainer'>
            <label className='label'>Update skills</label>
            <div className='control'>
              <Select
                options={options}
                isMulti
                defaultValue={prePopulateArray}
                onChange={handleMultiChange}
              />
            </div>
            <div className='field'>
              <label className='label'>CITY</label>
              <div className='control'>
                <input
                  className={`input is-rounded ${errors.city ? 'is-danger' : ''}`}
                  placeholder='City'
                  name='city'
                  value={data.city}
                  onChange={handleChange}
                />
              </div>
              {errors.city && <small className='help is-danger'>{errors.city}</small>}
            </div>
            <div className='field'>
              <label className='label'>POSTCODE</label>
              <div className='control'>
                <input
                  className={`input is-rounded ${errors.postcode ? 'is-danger' : ''}`}
                  placeholder='Postcode'
                  name='postcode'
                  value={data.postcode}
                  onChange={handleChange}
                />
              </div>
              <hr />
              {errors.postcode && <small className='help is-danger'>{errors.postcode}</small>}
            </div>
          </div>
        </div>
      </form>
    </section>
  )
}

export default UserForm

