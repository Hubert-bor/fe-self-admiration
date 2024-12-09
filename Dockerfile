# 拉取 nginx 基础镜像
FROM nginx:1.21.1

# 维护者信息
MAINTAINER tong.zhou

# 将 dist 文件中的内容复制到 /user/share/nginx/html/ 这个目录下面
COPY dist/ /user/share/nginx/html/

# 用本地配置文件来替换 nginx 镜像里的默认配置
COPY Docker/nginx/nginx.conf /ext/nginx/nginx.conf

# 对外暴露的端口号

EXPOSE 80

# 启动 nginx 容器
CMD [ "nginx", "-g","daemon off;" ]

