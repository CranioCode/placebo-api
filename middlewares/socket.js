const checkSocket = async (socket, next) => {

  try {    
    if(socket.request.isAuthenticated()){
      next();
    }else{
      throw new Error("user not Authenticated");
    }
  } catch (error) {
    console.log(error);
  }

};

export default checkSocket;
