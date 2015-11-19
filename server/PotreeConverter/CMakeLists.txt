project(PotreeConverter)

set(RAPIDJSON_INCLUDE_DIR lib/rapidjson/include)

file(GLOB_RECURSE files src/*.cpp include/*.h include/*.hpp )
file(GLOB_RECURSE lib_rapidjson_files ${RAPIDJSON_INCLUDE_DIR}/* )

include_directories(include ${Boost_INCLUDE_DIRS})
include_directories(include ${RAPIDJSON_INCLUDE_DIR})

SOURCE_GROUP("Header Files\\io" FILES 
	include/BINPointReader.hpp 
	include/BINPointWriter.hpp
	include/PlyPointReader.h
	include/PointReader.h
	include/PointWriter.hpp
	include/PTXPointReader.h
	include/XYZPointReader.hpp
)

SOURCE_GROUP("Source Files\\io" FILES 
	src/BINPointReader.cpp
	src/PTXPointReader.cpp
)

SET(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11")

SOURCE_GROUP("lib\\rapidjson" FILES ${lib_rapidjson_files})

add_executable(PotreeConverter ${files} ${lib_rapidjson_files})

target_link_libraries(PotreeConverter ${Boost_SYSTEM_LIBRARY} ${Boost_THREAD_LIBRARY} ${Boost_REGEX_LIBRARY} ${Boost_FILESYSTEM_LIBRARY} ${Boost_PROGRAM_OPTIONS_LIBRARY})

install(TARGETS PotreeConverter RUNTIME DESTINATION bin/ )