project(TCPServer)

set(sources
  main.cpp
  TCPServer.cpp
  handler_client.h
)

add_executable(TCPServer ${sources})

target_link_libraries(TCPServer)

install(TARGETS TCPServer RUNTIME DESTINATION bin/ )