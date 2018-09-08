library(data.table)
d <- fread("AdmissionsCorePopulatedTable.txt", sep="\t", header=TRUE)
ESI <- sample.int(5, 100, replace=TRUE)
d <- cbind(d[!duplicated(d$PatientID)], "ESI"=ESI)
d_inER <- d[1:20,]
d_reserve <- d[21:80,]
write.csv(d_inER, "ESI.inER.csv", row.names = FALSE)
write.csv(d_reserve, "ESI.reserve.csv", row.names = FALSE)
