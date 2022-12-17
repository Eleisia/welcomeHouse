package com.ssafy.vue.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.vue.model.Comment;
import com.ssafy.vue.model.mapper.CommentMapper;

@Service
public class CommentServiceImpl implements CommentService {

	@Autowired
	private CommentMapper commentDao;
	
	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<Comment> list(String articleno) throws Exception {
		//return commentDao.list(articleno);
		return sqlSession.getMapper(CommentMapper.class).list(articleno);
	}

	@Override
	public boolean create(Comment commentDto) throws Exception {
//		return commentDao.create(commentDto) == 1;
		return sqlSession.getMapper(CommentMapper.class).create(commentDto)==1;
	}

	@Override
	public boolean modify(Comment commentDto) throws Exception {
//		return commentDao.modify(commentDto) == 1;
		return sqlSession.getMapper(CommentMapper.class).modify(commentDto)==1;
	}

	@Override
	public boolean delete(int commentNo) throws Exception {
//		return commentDao.delete(commentNo) == 1;
		return sqlSession.getMapper(CommentMapper.class).delete(commentNo)==1;
	}

}
