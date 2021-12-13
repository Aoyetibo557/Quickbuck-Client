
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  chip: {
    margin: '5px 5px 5px 0',
  },
  subtitle: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px',
  },
  spacing: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  dot:{
    color: 'red', fontSize: "3rem", textAlign: 'center',
  },
  inactiveChip: {
    color: 'red',
  },
  inactiveSpan: {
    fontSize: "13px", fontWeight: '500', fontStyle: 'italic', marginLeft: '3px', color:'red'
  },
  link: {
    textDecoration: 'none',
  },
  
}));