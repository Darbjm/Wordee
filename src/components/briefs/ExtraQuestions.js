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
        <input
          className={`input is-small is-rounded ${
            errors.keypoint1 ? 'is-danger' : ''
          }`}
          placeholder="1"
          name="keypoint1"
          onChange={handleChange}
          value={data.keypoint1 || ''}
        />
      </div>
      <div className="control">
        <input
          className={`input is-small is-rounded ${
            errors.keypoint2 ? 'is-danger' : ''
          }`}
          placeholder="2"
          name="keypoint2"
          onChange={handleChange}
          value={data.keypoint2 || ''}
        />
      </div>
      <div className="control">
        <input
          className={`input is-small is-rounded ${
            errors.keypoint3 ? 'is-danger' : ''
          }`}
          placeholder="3"
          name="keypoint3"
          onChange={handleChange}
          value={data.keypoint3 || ''}
        />
      </div>
      <div className="control">
        <input
          className={`input is-small is-rounded ${
            errors.keypoint4 ? 'is-danger' : ''
          }`}
          placeholder="4"
          name="keypoint4"
          onChange={handleChange}
          value={data.keypoint4 || ''}
        />
      </div>
      <div className="control">
        <input
          className={`input is-small is-rounded ${
            errors.keypoint5 ? 'is-danger' : ''
          }`}
          placeholder="5"
          name="keypoint5"
          onChange={handleChange}
          value={data.keypoint5 || ''}
        />
      </div>
    </div>
  </div>
)

export default ExtraQuestions