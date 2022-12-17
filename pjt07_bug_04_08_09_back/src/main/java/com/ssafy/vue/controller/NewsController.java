package com.ssafy.vue.controller;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.vue.model.service.NewsService;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/news")
@Api("Map 컨트롤러  API V1")
public class NewsController {

	private final Logger logger = LoggerFactory.getLogger(NewsController.class);

	@Autowired
	NewsService newsService;
	
	@GetMapping(value = "/{keyword}", produces = "application/json;charset=utf-8")
	public ResponseEntity<String> aptList(@PathVariable("keyword") String keyword) throws IOException {
		logger.info("네이버 검색 - 호출");
		
		String value = newsService.searchKeyword(keyword);
		return new ResponseEntity<String>(value, HttpStatus.OK);
	}
}
