import { forwardRef, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import * as TodoActions from '../store/actions/TodoActions';
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";


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
import { addTodo } from '../services/TodoService';
import { TextRotationDownTwoTone } from '@material-ui/icons';



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

function Todo() {
  const classes = useStyles();
  const todoList = useSelector(state => state.todo.todolist);
  const error = useSelector(state => state.todo.error);
  const loading = useSelector(state => state.todo.loading);
  const dispatch = useDispatch();
  const onSubmit = data => {
    dispatch(TodoActions.persistTodo({
      todo: data.todo,
      done: false
    }));  
    reset();
  };
  const { handleSubmit, register, errors, reset } = useForm();
  const SubmitButton = forwardRef((props, ref) => (<button {...props} ref={ref} type='submit' />));

  function handleToggle(value) {
    const todo = {...value};
    todo.done = !value.done;
    dispatch(TodoActions.checkTodo(todo));
  }


  function onDelete(id) {
    dispatch(TodoActions.excludeTodo(id));
  }

  useEffect(() => {
    dispatch(TodoActions.getAll());
  }, [dispatch]);

  if (loading) {
    return (
      <Box
      display="flex"
      flex={1}
      height="100%"
      justifyContent="space-around"
      alignItems="center"
      >
        <Loader
          type="ThreeDots"
          color="#283593"
          height={100}
          width={100}
          timeout={3000}
        />
      </Box>
    );
  }

  if (error) {
    toast.error(error);
    dispatch(TodoActions.setError(""));
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
                  error={!!errors.todo}
                  inputRef={register({ required: true })}
                  fullWidth id="standard-basic"
                  name="todo"
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
              {todoList && todoList.map((t) => (
                <ListItem key={t.id} role="listitem" button name={t.todo} >
                  <ListItemText id={t.id} primary={t.todo}
                    style={{ textDecoration: t.done ? 'line-through' : 'none' }}
                  />
                  <ListItemIcon onClick={() => handleToggle(t)}>
                    <Checkbox
                      checked={t.done}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': t.todo }}
                    />
                  </ListItemIcon>

                  <ListItemIcon>
                    <IconButton color="secondary" aria-label="upload picture" component="span" onClick={() => onDelete(t.id)}>
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

export default Todo;
