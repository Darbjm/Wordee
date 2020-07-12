import React from 'react'

const ExtraQuestions = ({ data, handleChange, errors }) => (
  <div>
    <div className="field">
      <div className="underline">What is the name of your product or service?</div>
      <div className="control">
        <input
          className={`input is-small is-rounded ${
            errors.prodName ? 'is-danger' : ''
          }`}
          placeholder="Product or service"
          name="prodName"
          onChange={handleChange}
          value={data.prodName || ''}
        />
      </div>
    </div>
    {errors.prodName && <small className="help is-danger">{errors.prodName}</small>}
    <div className="field">
      <div className="underline">Is it a new product or service?</div>
      <div className="button-control">
        <label
          htmlFor="radio21"
          className={`wide ${errors.new && 'is-danger'}`}
        >
          <input
            id="radio21"
            name="new"
            type="radio"
            value="New and not yet launched"
            onChange={handleChange}
            checked={data.new === 'New and not yet launched'}
          />
          <span className="wide">New and not yet launched</span>
        </label>

        <label
          htmlFor="radio22"
          className={`wide ${errors.new && 'is-danger'}`}
        >
          <input
            id="radio22"
            name="new"
            type="radio"
            value="Already launched"
            onChange={handleChange}
            checked={data.new === 'Already launched'}
          />
          <span className="wide">Already launched</span>
        </label>

        <label
          htmlFor="radio23"
          className={`wide ${errors.new && 'is-danger'}`}
        >
          <input
            id="radio23"
            name="new"
            type="radio"
            value="Not applicable"
            onChange={handleChange}
            checked={data.new === 'Not applicable'}
          />
          <span className="wide">Not applicable</span>
        </label>
      </div>
      {errors.new && (
        <small className="help is-danger">{errors.new}</small>
      )}
    </div>
    <div className="field">
      <div className="underline">Key selling points of your product or service</div>
      <div className="control">
        <textarea
          className={`textarea is-small ${
            errors.keypoints ? 'is-danger' : ''
          }`}
          placeholder="Please give at least 3 points"
          name="keypoints"
          onChange={handleChange}
          value={data.keypoints || ''}
        />
      </div>
    </div>
    {errors.keypoints && (
      <small className="help is-danger">{errors.keypoints}</small>
    )}
  </div>
)

export default ExtraQuestions