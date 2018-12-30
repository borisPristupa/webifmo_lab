package webservice;

import ejb.MainBean;
import ejb.SessionBean;
import entity.RecordEntity;
import entityservice.RecordService;
import stateful.RecordsStateful;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.math.BigDecimal;
import java.util.Optional;

@Path("main")
public class Main {
    @EJB
    RecordService recordService;

    @EJB
    MainBean mainBean;

    @Produces({MediaType.APPLICATION_JSON})
    @GET
    @Path("records")
    public Response getRecords(@QueryParam("sessionId") String sessionId) {
        Optional<SessionBean> sessionBean = MyApplication.getSessionBean(sessionId);
        RecordsStateful recordsStateful = new RecordsStateful();

        if (sessionBean.isPresent()) {
            recordsStateful.setRecordEntities(
                    recordService.findAllByClientId(
                            sessionBean.get().getClient().getId()
                    )
            );
        } else {
            recordsStateful.setMessage("Sorry, you have to log in");
        }
        return Response
                .status(Response.Status.OK)
                .entity(recordsStateful.toString())
                .build();
    }

    @Produces({MediaType.APPLICATION_JSON})
    @GET
    @Path("records/add")
    public Response addRecord(@QueryParam("sessionId") String sessionId,
                              @QueryParam("x") Double x,
                              @QueryParam("y") Double y,
                              @QueryParam("r") Double r) {
        Optional<SessionBean> sessionBean = MyApplication.getSessionBean(sessionId);
        RecordsStateful recordsStateful = new RecordsStateful();

        if (sessionBean.isPresent()) {
            recordsStateful.setRecordEntities(
                    recordService.findAllByClientId(
                            sessionBean.get().getClient().getId()
                    )
            );

            BigDecimal bX, bY, bR;
            bX = BigDecimal.valueOf(x);
            bY = BigDecimal.valueOf(y);
            bR = BigDecimal.valueOf(r);

            int invalidness = mainBean.validate(bX, bY, bR);
            if (0 != invalidness) {
                String message = "Invalid parameters.";

                if ((invalidness & 1) != 0)
                    message += " Invalid x.";

                if ((invalidness & 2) != 0)
                    message += " Invalid y.";

                if ((invalidness & 4) != 0)
                    message += " Invalid r.";
                recordsStateful.setMessage(message);
                return Response
                        .status(Response.Status.OK)
                        .entity(recordsStateful.toString())
                        .build();
            }

            RecordEntity recordEntity = new RecordEntity();
            recordEntity.setX(BigDecimal.valueOf(x));
            recordEntity.setY(BigDecimal.valueOf(y));
            recordEntity.setR(BigDecimal.valueOf(r));
            recordEntity.setHit(mainBean
                    .isInsideArea(bX, bY, bR));
            recordEntity.setClientByClientId(sessionBean.get().getClient());

            recordService.writeRecord(recordEntity);
            recordsStateful.addRecordEntity(recordEntity);
        } else {
            recordsStateful.setMessage("Sorry, you have to log in");
        }

        return Response
                .status(Response.Status.OK)
                .entity(recordsStateful.toString())
                .build();
    }

    @Produces({MediaType.APPLICATION_JSON})
    @GET
    @Path("records/clear")
    public Response clearRecords(@QueryParam("sessionId") String sessionId) {
        Optional<SessionBean> sessionBean = MyApplication.getSessionBean(sessionId);
        RecordsStateful recordsStateful = new RecordsStateful();

        if (sessionBean.isPresent()) {
            recordService.clearAllByClientId(sessionBean.get().getClient().getId());
        } else {
            recordsStateful.setMessage("Sorry, you have to log in. ");
        }

        return Response
                .status(Response.Status.OK)
                .entity(recordsStateful.toString())
                .build();
    }

    @Produces({MediaType.APPLICATION_JSON})
    @POST
    @Path("records")
    public Response addRecordPOST(@FormParam("sessionId") String sessionId,
                                   @FormParam("x") Double x,
                                   @FormParam("y") Double y,
                                   @FormParam("r") Double r) {
        return addRecord(sessionId, x, y ,r);
    }

    @Produces({MediaType.APPLICATION_JSON})
    @POST
    @Path("records/clear")
    public Response clearRecordsPOST(@FormParam("sessionId") String sessionId) {
        return clearRecords(sessionId);
    }


    @GET
    public String wtf() {
        return "main page";
    }
}
