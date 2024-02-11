import chalk from 'chalk';
import PostModel from '../models/post.js';
import { appendLog } from '../../utils/logs.js';

export const getPost = async (req, res) => {
  try {
     // Log request details
     const requestLog = `${new Date().toISOString()} - ${req.method} ${req.url} - Request Body: ${JSON.stringify(req.body)}\n`;

     // Append request log to Azure Blob Storage
     await appendLog(requestLog);
 
    const postList = await PostModel.find({});
    res.status(200).json({
      message: 'GetPost',
      data: postList,
    });
  } catch (error) {
    console.log(chalk.red.bold.italic(error));
    const errorMessage = new Error(error);
    res.status(500).json({
      message: 'Internal server error',
      errorMessage,
    });
  }
};

export const createPost = async (req, res) => {
  const { title, postMessage } = req.body;
  const createPost = new PostModel({
    title,
    postMessage,
  });

  const createPostResult = await createPost.save();
  console.log('createPostResult', createPostResult);
  res.status(201).json({
    data: createPostResult,
  });
};

export const deletePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const deletedPost = await PostModel.findByIdAndDelete(postId);
    res.status(200).json({
      message: 'Post deleted',
      data: deletedPost,
    });
  } catch (error) {
    console.log(chalk.red.bold.italic(error));
    const errorMessage = new Error(error);
    res.status(500).json({
      message: 'Internal server error',
      errorMessage,
    });
  }
};

export const updatePost = async (req, res) => {
  const { postId } = req.params;
  const data = req.body;
  console.log('req.body',data);
  try {
    const findPost = await PostModel.findById(postId).select(
      'title postMessage id'
    );
 
    if (findPost) {
     console.log('data',data);
      const updatePost = await PostModel.findByIdAndUpdate(postId, {...data}, {new:true});
      console.log(chalk.blue(updatePost));
      res.status(200).json({
        message: 'Post update',
        data: updatePost,
      });
     
    }
    else{
      throw(new Error("Post not exist!!"))
    }
  } catch (error) {
    console.log(chalk.red.bold.italic(error));
    const errorMessage = error;
    res.status(500).json({
      message: 'Internal server error',
      error:{
        message:error.message,
        stack:error.stack
      },
      errorMessage,
    });
  }
};
