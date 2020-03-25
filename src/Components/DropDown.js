import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

export default function DropDown (props) {
  const classes = useStyles()
  const { values, onChange, label, helperText } = props
  const [age, setAge] = React.useState('')

  const handleChange = event => {
    setAge(event.target.value)
    onChange && onChange(event.target.value)
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
        >
          {values.map(
            (value, index) => (
              <MenuItem key={index} value={value}>{value}</MenuItem>
            ))
          }
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </div>
  )
}

DropDown.propTypes = {
  label: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func
}

DropDown.defaultProps = {
  label: '',
  values: [],
  onChange: null
}
