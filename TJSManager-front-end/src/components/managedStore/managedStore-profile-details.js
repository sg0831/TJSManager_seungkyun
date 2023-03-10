import { useState,useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import axios from 'axios';
import {useRouter} from 'next/router';
import {domain} from '../../api/restful-api';

export const ManagedStoreProfileDetails = (props) => {
  const [values, setValues] = useState({
    storeNum: null,
    storePassword: '',
    storeName: '',
    storeAdress: '',
    storeTelNum: ''
  });
  function getParameters()
  {
    const queryString=window.location.search.slice(1);
    const parameters={};
    for(const nameAndValue of queryString.split('&'))
    {
       const [name,value]=nameAndValue.split('=');
       parameters[name]=value;
    }
  
    return parameters;
  }
  useEffect
  ( 
    ()=>
    {
      const employee=JSON.parse(sessionStorage.getItem('employee'));
      setValues({...values});

      const parameters=getParameters();
      if(parameters.method=='update')
      {
        axios.get(domain+'/managed_store'+('/'+parameters.storeNum)).
        then((response)=>{setValues({...response.data});});
      }

      // setValues({...values});
    },[]
  );
  
  function validate(values)
  {
    const requiredNames=['storePassword','storeName','storeAdress','storeTelNum'];

    for(const name of requiredNames)
    {
      if(values[name]=='')
      {
        return false;
      }
    }

    return true;
  }
  const [isValid, setIsValid] = useState(validate(values));
  useEffect(()=>{setIsValid(validate(values));},[values]);

  const handleChange = (event) => {
    const positiveNumberNames=new Set([]);
    if(positiveNumberNames.has(event.target.name))
    {
      if(event.target.value!='')
      {
        event.target.value=Math.abs(event.target.value);
      }
    }

    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const router=useRouter();
  function handleSubmit(event)
  {
    event.preventDefault();
    
    const parameters=getParameters();
    axios
    (
      {
        url:domain+'/managed_store'+(parameters.method=='create'?'':('/'+parameters.storeNum)),
        method:parameters.method=='create'?'post':'put',
        data:values
      }
    ).
    then(()=>{router.push('/managed-stores');});
  }

  return (
    <form onSubmit={handleSubmit}
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          // subheader="The information can be edited"
          title="?????? ??????"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={values.storePassword==''}
                fullWidth
                helperText={values.storePassword==''?'???????????? ?????? ??????????????? ????????? ?????????':''}
                label="?????? ???????????? ?????? ????????????"
                name="storePassword"
                onChange={handleChange}
                required
                type="password"
                value={values.storePassword}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={values.storeName==''}
                fullWidth
                helperText={values.storeName==''?'???????????? ????????? ?????????':''}
                label="?????????"
                name="storeName"
                onChange={handleChange}
                required
                value={values.storeName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={values.storeAdress==''}
                fullWidth
                helperText={values.storeAdress==''?'?????? ????????? ????????? ?????????':''}
                label="?????? ??????"
                name="storeAdress"
                onChange={handleChange}
                required
                value={values.storeAdress}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={values.storeTelNum==''}
                fullWidth
                helperText={values.storeTelNum==''?'?????? ???????????? ????????? ?????????':''}
                label="?????? ?????????"
                name="storeTelNum"
                onChange={handleChange}
                required
                value={values.storeTelNum}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="secondary"
            variant="contained"
            sx={{ mr: 1 }}
            onClick={()=>history.back()}
          >
            ????????????
          </Button>
          <Button
            color="primary"
            disabled={!isValid}
            type='submit'
            variant="contained"
          >
            ?????? ??????
          </Button>
        </Box>
      </Card>
    </form>
  );
};
