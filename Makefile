DIR_AP = ./application
DIR_BIZ = ./biz

.PHONY: ap biz

ap:
	cd $(DIR_AP) && yarn dev

biz:
	cd $(DIR_BIZ) && yarn dev
