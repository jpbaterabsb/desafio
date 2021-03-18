import {useState, forwardRef} from 'react';
import { useForm } from "react-hook-form";

import {
  Box,
  CardHeader,
  Card,
  CardContent,
  makeStyles,
  List,
  ListItemText,
  ListItemIcon,
  Checkbox,
  ListItem,
  Divider,
  TextField,
 IconButton
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';



const useStyles = makeStyles({
  root: {
    minWidth: 400,
  },
  form: {
    margin: "20px 0px"
  },
  cardHeader: {
    textAlign: 'center',
  },
  addButton: {
    marginTop: 8,
  },
  inputTodo: {
    marginRight: 24
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function App() {
  const classes = useStyles();
  const [todo, setTodo] = useState(['comer', 'dormir', 'transar']);
  const [checks, setChecks] = useState([]);
  const onSubmit = data => {
    setTodo([...todo, data.newTodo]);
    reset();
  };
  const {handleSubmit, register, errors, reset} = useForm();
  const SubmitButton = forwardRef((props, ref) => ( <button {...props} ref={ref} type='submit' />));



  function handleToggle(value) {
    const currentIndex = checks.indexOf(value);
    const newChecked = [...checks];
    if(currentIndex === -1) {
      newChecked.push(value);
    }else {
      newChecked.splice(currentIndex, 1);
    }
    setChecks(newChecked);
  }


  function onDelete(value) {
    const newTodo = [...todo];
    newTodo.splice(value, 1);
    setTodo(newTodo);
  }

  return (
    <Box display="flex" flex={1} height="100vh" width="100vw">
      <Box justifyContent="center" alignItems="center" display="flex" flex={1}>
        <Card className={classes.root}>
          <CardHeader title="Todo List" className={classes.cardHeader} />
          <CardContent>
            <Divider />
            <form id="f1" className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <Box justifyContent="space-around" display="flex" paddingLeft={4} paddingRight={4}>
                <TextField 
                className={classes.inputTodo}
                error={!!errors.newTodo}
                inputRef={register({required:true})} 
                fullWidth id="standard-basic" 
                name="newTodo" 
                label="Actions todo"
                 />
                <Box>
                  <IconButton color="primary" className={classes.addButton} aria-label="upload picture" component={SubmitButton}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
            </form>

            <Divider />
            <List className={classes.list} dense component="div" role="list">
              {todo.map((t, i) => (
                <ListItem key={i} role="listitem" button name={t} onClick={() => handleToggle(t)}>
                  <ListItemText id={i} primary={t}
                          style={{ textDecoration : checks.indexOf(t) !== -1 ? 'line-through' : 'none' }} 
                  />
                  <ListItemIcon>
                    <Checkbox
                      checked={checks.indexOf(t) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': t }}
                    />
                  </ListItemIcon>

                  <ListItemIcon>
                    <IconButton color="secondary" aria-label="upload picture" component="span" onClick={() => onDelete(i)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemIcon>
                </ListItem>
              )
              )}
              <ListItem />
            </List>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default App;
