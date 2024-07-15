package com.company.details.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
public class RequestDto {
    private List<SearchRequestDto> searchRequestDto;


}
