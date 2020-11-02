import propTypes from 'prop-types'
import React from 'react'
import ExtraQuestions from './ExtraQuestions'

/**Component to create brief */
const BriefForm = ({ data, handleChange, handleSubmit, errors, header, extraQuestions, type }) => (
  <div className="brief">
    <h1 className="larger">{header}</h1>
    <form className="brief-form" onSubmit={handleSubmit}>
      <br />
      <div className="field">
        <div className="control">
          <input
            className={`input is-small is-rounded ${
              errors.title ? 'is-danger' : ''
            }`}
            placeholder="Title"
            name="title"
            onChange={handleChange}
            value={data.title || ''}
          />
        </div>
      </div>
      {errors.title && <small className="help is-danger">{errors.title}</small>}

      <div className="field">
        <div className="underline">What content do you need?</div>
        <div className="button-control">
          <label
            htmlFor="radio1"
            className={`${errors.content && 'is-danger'}`}
          >
            <input
              id="radio1"
              name="content"
              type="radio"
              value="Blog Article"
              onChange={handleChange}
              checked={data.content === 'Blog Article'}
            />
            <span>Blog Article</span>
          </label>

          <label
            htmlFor="radio2"
            className={`${errors.content && 'is-danger'}`}
          >
            <input
              id="radio2"
              name="content"
              type="radio"
              value="Product Page"
              onChange={handleChange}
              checked={data.content === 'Product Page'}
            />
            <span>Product Page</span>
          </label>

          <label
            htmlFor="radio3"
            className={`${errors.content && 'is-danger'}`}
          >
            <input
              id="radio3"
              name="content"
              type="radio"
              value="CRM Email"
              onChange={handleChange}
              checked={data.content === 'CRM Email'}
            />
            <span>
              CRM <br /> Email
            </span>
          </label>

          <label
            htmlFor="radio4"
            className={`${errors.content && 'is-danger'}`}
          >
            <input
              id="radio4"
              name="content"
              type="radio"
              value="Press Release"
              onChange={handleChange}
              checked={data.content === 'Press Release'}
            />
            <span>Press Release</span>
          </label>
        </div>
        {errors.content && (
          <small className="help is-danger">{errors.content}</small>
        )}
      </div>
      <div className="field">
        <div className="underline">How many words?</div>
        <div className="button-control">
          <label htmlFor="radio5" className={`${errors.length && 'is-danger'}`}>
            <input
              id="radio5"
              name="length"
              type="radio"
              value="300"
              onChange={handleChange}
              checked={data.length === '300'}
            />
            <span>300</span>
          </label>

          <label htmlFor="radio6" className={`${errors.length && 'is-danger'}`}>
            <input
              id="radio6"
              name="length"
              type="radio"
              value="700"
              onChange={handleChange}
              checked={data.length === '700'}
            />
            <span>700</span>
          </label>

          <label htmlFor="radio7" className={`${errors.length && 'is-danger'}`}>
            <input
              id="radio7"
              name="length"
              type="radio"
              value="1,000"
              onChange={handleChange}
              checked={data.length === '1,000'}
            />
            <span>1,000</span>
          </label>

          <label htmlFor="radio8" className={`${errors.length && 'is-danger'}`}>
            <input
              id="radio8"
              name="length"
              type="radio"
              value="2,000"
              onChange={handleChange}
              checked={data.length === '2,000'}
            />
            <span>2,000</span>
          </label>
        </div>
        {errors.length && (
          <small className="help is-danger">{errors.length}</small>
        )}
      </div>
      <div className="field">
        <div className="underline">Choose the level of writer</div>
        <div className="button-control">
          <label
            htmlFor="radio9"
            className={`wide ${errors.level && 'is-danger'}`}
          >
            <input
              id="radio9"
              name="level"
              type="radio"
              value="Wordee accredited writer"
              onChange={handleChange}
              checked={data.level === 'Wordee accredited writer'}
            />
            <span className="wide">Wordee accredited writer</span>
          </label>

          <label
            htmlFor="radio10"
            className={`wide ${errors.level && 'is-danger'}`}
          >
            <input
              id="radio10"
              name="level"
              type="radio"
              value="Wordee luxe writer"
              onChange={handleChange}
              checked={data.level === 'Wordee luxe writer'}
            />
            <span className="wide">Wordee luxe writer</span>
          </label>
        </div>
        {errors.level && (
          <small className="help is-danger">{errors.level}</small>
        )}
      </div>
      <div className="field">
        <div className="underline">
          What is the purpose of the piece of content?
        </div>
        <div className="button-control">
          <label
            htmlFor="radio11"
            className={`wide ${errors.purpose && 'is-danger'}`}
          >
            <input
              id="radio11"
              name="purpose"
              type="radio"
              value="Drive traffic to their website"
              onChange={handleChange}
              checked={data.purpose === 'Drive traffic to their website'}
            />
            <span className="wide">Drive traffic to my website</span>
          </label>

          <label
            htmlFor="radio12"
            className={`wide ${errors.purpose && 'is-danger'}`}
          >
            <input
              id="radio12"
              name="purpose"
              type="radio"
              value="Sell a product or service"
              onChange={handleChange}
              checked={data.purpose === 'Sell a product or service'}
            />
            <span className="wide">Sell a product or service</span>
          </label>

          <label
            htmlFor="radio13"
            className={`wide ${errors.purpose && 'is-danger'}`}
          >
            <input
              id="radio13"
              name="purpose"
              type="radio"
              value="Reinforce their brand values"
              onChange={handleChange}
              checked={data.purpose === 'Reinforce their brand values'}
            />
            <span className="wide">Reinforce your brand values</span>
          </label>

          <label
            htmlFor="radio14"
            className={`wide ${errors.purpose && 'is-danger'}`}
          >
            <input
              id="radio14"
              name="purpose"
              type="radio"
              value="Remain credible in their industry"
              onChange={handleChange}
              checked={data.purpose === 'Remain credible in their industry'}
            />
            <span className="wide">Remain credible in your industry</span>
          </label>

          <label
            htmlFor="radio15"
            className={`wide ${errors.purpose && 'is-danger'}`}
          >
            <input
              id="radio15"
              name="purpose"
              type="radio"
              value="Engage their audience"
              onChange={handleChange}
              checked={data.purpose === 'Engage their audience'}
            />
            <span className="wide">Engage your audience</span>
          </label>
        </div>
        {errors.purpose && (
          <small className="help is-danger">{errors.purpose}</small>
        )}
      </div>
      {extraQuestions ? <ExtraQuestions 
        data={data}
        errors={errors}
        handleChange={handleChange}
      /> : ''}
      <div className="field">
        <div className="underline">
          What is the message your audience should leave with?
        </div>
        <div className="control">
          <input
            className={`input is-small is-rounded ${
              errors.message ? 'is-danger' : ''
            }`}
            placeholder="Message"
            name="message"
            onChange={handleChange}
            value={data.message || ''}
          />
        </div>
        {errors.message && (
          <small className="help is-danger">{errors.message}</small>
        )}
      </div>
      <div className="field">
        <div className="underline">
          Paste a URL below to a reference article to guide your writer
        </div>
        <div className="control">
          <input
            className={`input is-small is-rounded ${
              errors.url ? 'is-danger' : ''
            }`}
            placeholder="Url"
            name="url"
            onChange={handleChange}
            value={data.url || ''}
          />
        </div>
        {errors.url && <small className="help is-danger">{errors.url}</small>}
      </div>
      <div className="field">
        <div className="underline">When do you need a first draft?</div>
        <div className="button-control">
          <label
            htmlFor="radio16"
            className={`${errors.first_draft && 'is-danger'}`}
          >
            <input
              id="radio16"
              name="first_draft"
              type="radio"
              value="24 Hours"
              onChange={handleChange}
              checked={data.first_draft === '24 Hours'}
            />
            <span>24 Hours</span>
          </label>

          <label
            htmlFor="radio17"
            className={`${errors.first_draft && 'is-danger'}`}
          >
            <input
              id="radio17"
              name="first_draft"
              type="radio"
              value="48 Hours"
              onChange={handleChange}
              checked={data.first_draft === '48 Hours'}
            />
            <span>48 Hours</span>
          </label>

          <label
            htmlFor="radio18"
            className={`${errors.first_draft && 'is-danger'}`}
          >
            <input
              id="radio18"
              name="first_draft"
              type="radio"
              value="72 Hours"
              onChange={handleChange}
              checked={data.first_draft === '72 Hours'}
            />
            <span>72 Hours</span>
          </label>

          <label
            htmlFor="radio19"
            className={`${errors.first_draft && 'is-danger'}`}
          >
            <input
              id="radio19"
              name="first_draft"
              type="radio"
              value="1 Week"
              onChange={handleChange}
              checked={data.first_draft === '1 Week'}
            />
            <span>1 Week</span>
          </label>

          <label
            htmlFor="radio20"
            className={`${errors.first_draft && 'is-danger'}`}
          >
            <input
              id="radio20"
              name="first_draft"
              type="radio"
              value="2 Weeks"
              onChange={handleChange}
              checked={data.first_draft === '2 Weeks'}
            />
            <span>2 Weeks</span>
          </label>
        </div>
        {errors.first_draft && (
          <small className="help is-danger">{errors.first_draft}</small>
        )}
      </div>
      <hr />
      <div className="header">
        <div className="underline">
          <h1 className="larger">Topic & Keywords</h1>
        </div>
      </div>
      <div className="field">
        <div className="underline">
          What is the topic of the article going to be?
        </div>
        <div className="control">
          <input
            className={`input is-small is-rounded ${
              errors.topic ? 'is-danger' : ''
            }`}
            placeholder="Topic"
            name="topic"
            onChange={handleChange}
            value={data.topic || ''}
          />
        </div>
        {errors.topic && (
          <small className="help is-danger">{errors.topic}</small>
        )}
      </div>
      <div className="field">
        <div className="underline">
          Keywords to be integrated into your article
        </div>
        <div className="control space">
          <input
            className={`input is-small is-rounded ${
              errors.keyword1 ? 'is-danger' : ''
            }`}
            placeholder="1."
            name="keyword1"
            onChange={handleChange}
            value={data.keyword1 || ''}
          />
        </div>
        {errors.keyword1 && (
          <small className="help is-danger">{errors.keyword1}</small>
        )}
        <div className="control space">
          <input
            className={`input is-small is-rounded ${
              errors.keyword2 ? 'is-danger' : ''
            }`}
            placeholder="2."
            name="keyword2"
            onChange={handleChange}
            value={data.keyword2 || ''}
          />
        </div>
        {errors.keyword2 && (
          <small className="help is-danger">{errors.keyword2}</small>
        )}
        <div className="control space">
          <input
            className={`input is-small is-rounded ${
              errors.keyword3 ? 'is-danger' : ''
            }`}
            placeholder="3."
            name="keyword3"
            onChange={handleChange}
            value={data.keyword3 || ''}
          />
        </div>
        {errors.keyword3 && (
          <small className="help is-danger">{errors.keyword3}</small>
        )}
      </div>
      <div className="width">
        <button type="submit" className="button is-large is-rounded blue">
          {type}
        </button>
      </div>
    </form>
  </div>
)

BriefForm.propTypes = {
  data: propTypes.object,
  handleChange: propTypes.func,
  handleSubmit: propTypes.func,
  errors: propTypes.object,
  header: propTypes.string
}

export default BriefForm
